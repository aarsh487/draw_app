import { axiosInstance } from "../config";

export function useShape() {
  const getExistingShapes = async (roomId: string) => {
    const res = await axiosInstance.get(`/chat/${roomId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const databaseShapes = res.data.messages;
    console.log(databaseShapes);

    const shapes = databaseShapes.map((x: { message: string }) => {
      const data = JSON.parse(x.message);
      console.log(data);
      return data.shape;
    });
    return shapes;
  };
  return { getExistingShapes };
}
