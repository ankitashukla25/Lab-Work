
import axios from "axios";

const API = "http://localhost:5000/api/feedback";

export const getFeedback = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const addFeedback = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

export const updateFeedback = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

export const deleteFeedback = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
