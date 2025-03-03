import { metaDataController } from "@/api/metaDataController";

export const getMetaDataType = async ({ body, setData, isLoading }) => {
  isLoading(true);
  try {
    const res = await metaDataController.getMetaData(body);
    setData(res.data.data.docs);
  } catch (err) {
    console.error("Error fetching metadata:", err);
    setData([]);
  } finally {
    isLoading(false);
  }
};

export const getContentList = async ({ body, setData, setLoading }) => {
  setLoading(true);
  try {
    const res = await metaDataController.getContentLibrary(body);
    setData(res.data.data.docs);
  } catch (err) {
    console.error("Error Fetching Content List : ", err);
  } finally {
    setLoading(false);
  }
};
