import axios from "axios";

export const baseUrl = "http://10.0.2.2:8080/";
// export const baseUrl = "https://petso.in/";

axios.defaults.baseURL = baseUrl;

export const register = (formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const login = (formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response));
  });

export const newListing = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("market/newlisting", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const getTrending = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("market/trending", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const getLatest = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("market/latest", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const likeListing = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`market/listings/${id}/like`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const unlikeListing = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`market/listings/${id}/unlike`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const bookmarkListing = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`market/listings/${id}/bookmark`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const unbookmarkListing = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`market/listings/${id}/unbookmark`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const getBookmarked = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get(`market/bookmarked`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
