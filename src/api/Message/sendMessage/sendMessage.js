import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toId, message } = args;
      let { roomId } = args;
      //1.룸아이디가 있으면
      // (방이 생성되었고 그 방안에 참여자가 생성되어 있으므로)
      //  메세지 전송 (중복)

      //2.룸아이디가 없으면
      // 수신자아이디를 보고 수신자 아이디가 있으면(3에서 이미 필터링)
      //  송신자에게서 수신자와의 방이 존재하는지 확인
      //   없으면 송신자와 수신자의 방을 만들고
      //    그방의 참여자로 등록하고 (방만들면서 같이 가능(connect))
      //     메세지 전송 (중복)

      //3.룸아이디와 수신자아이디 둘다 없으면 에러 (우선 처리)

      if (roomId === undefined && toId === "") {
        throw Error("Room/To is undefined.");
      }

      if (roomId === undefined) {
        let room;
        try {
          room = await prisma.user({ id: user.id }).rooms({
            where: {
              participants_some: {
                id: toId
              }
            }
          });
          if (room[0].id !== undefined) {
            roomId = room[0].id;
          }
        } catch {
          throw Error("user don't have room.");
        }

        if (roomId === undefined) {
          try {
            room = await prisma.createRoom({
              participants: {
                connect: [{ id: user.id }, { id: toId }]
              }
            });
          } catch {
            throw Error("createRoom fail.");
          }
        }
      }

      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: { id: toId }
        },
        room: {
          connect: { id: roomId }
        }
      });
    }
  }
};
