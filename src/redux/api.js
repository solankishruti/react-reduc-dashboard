import axios from "axios";
// eslint-disable-next-line
import { app } from "../FirebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const authentication = getAuth();

export const loadUsersApi = async () =>
  await axios.get("http://localhost:5000/users");

export const createUserApi = async (user) =>
  await axios.post("http://localhost:5000/users", user);

export const deleteUserApi = async (userId) =>
  await axios.delete(`http://localhost:5000/users/${userId}`);

export const updateUserApi = async (userId, userInfo) =>
  await axios.put(`http://localhost:5000/users/${userId}`, userInfo);

export const loadUsersByIDApi = async (email, password) =>
  // await axios.post("https://reqres.in/api/login", user);
  signInWithEmailAndPassword(authentication, email, password);

export const getSingleUserApi = async (userId) =>
  await axios.get(`http://localhost:5000/users/${userId}`);

export const loadProductsApi = async () =>
  await axios.get("http://localhost:5000/products");

export const getSingleProductApi = async (productId) =>
  await axios.get(`http://localhost:5000/products/${productId}`);
