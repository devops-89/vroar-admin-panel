import userController from "@/api/user";

export const getUserList = ({ body, setData, isLoading, setErrMessage }) => {
  userController
    .getUsers(body)
    .then((res) => {
      const response = res.data.data;
      setData(response);
      isLoading(false);
    })
    .catch((err) => {
      console.log("err", err);
      let errMessage =
        (err.response && err.response.data.message) ||
        err.message ||
        "Something went wrong";
      setErrMessage(errMessage);
    });
};

export const getUserRoadMapJourney = ({ userId, setLoading, setData }) => {
  userController
    .getUserRoadmapJourney(userId)
    .then((res) => {
      // console.log("res", res);
      setData(res.data.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
