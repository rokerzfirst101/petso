import axios from "axios";

export const defaultAvatar = `https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*`;
export const baseUrl = "http://10.0.2.2:8080/";
// export const baseUrl = "https://petso.in/";

// axios.defaults.baseURL = "https://petso.in/";
axios.defaults.baseURL = "http://10.0.2.2:8080/";

//AUTHENTICATION

export const register = (formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/auth/register", formData, {
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
      .post("api/auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response));
  });

export const editProfile = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/auth/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })

export const editAvatar = (token, formData) => 
  new Promise((resolve, reject) => {
    axios
      .post("api/auth/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

//LISTINGS

export const newListing = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/market/newlisting", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const userListings = (token, id) => 
  new Promise((resolve, reject) => {
    axios
      .get(`api/market/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const getLatest = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/market/latest", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const likeListing = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/market/listings/${id}/like`, {
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
      .get(`api/market/listings/${id}/unlike`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

//EXPERT

export const createExpertPost = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/expert/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export const getExpertPosts = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/expert/all", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

//QandA

export const createQuestionAnswerPost = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/qanda/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  });

export const getQuestionAnswerPosts = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/qanda/all", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

  export const likeQandA = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/qanda/${id}/like`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const unlikeQandA = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/qanda/${id}/unlike`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

export const commentQandA = (token, id, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post(`api/qanda/${id}/comment`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

//DOCTOR

export const registerDoctor = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/doctor/apply", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  });

export const getDoctorStatus = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/doctor/status", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const findDoctors = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/doctor/find", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

//CONSULT

export const createConsult = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/consult/create", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const messageConsult = (token, formData, id) =>
  new Promise((resolve, reject) => {
    axios
      .post(`api/consult/answer/${id}`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const rateConsult = (token, formData, id) =>
  new Promise((resolve, reject) => {
    axios
      .post(`api/consult/rate/${id}`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const acceptConsult = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/consult/accept/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const declineConsult = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/consult/decline/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const getUserConsults = (token) => 
  new Promise((resolve, reject) => {
    axios
      .get("api/consult/user", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const getDoctorConsults = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/consult/doctor", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

// ADMIN

export const getDoctorsAdmin = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/admin/doctors", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const approveDoctor = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/admin/doctors/approve/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const rejectDoctor = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/admin/doctors/reject/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

  export const getExpertPostAdmin = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/admin/expert", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const approveExpertPost = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/admin/expert/approve/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const rejectExpertPost = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/admin/expert/reject/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

//REPORT

export const reportListing = (token, formData) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/report/listing/new", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

  export const reportQandA = (token, formData) =>
    new Promise((resolve, reject) => {
      axios
        .post("api/report/qanda/new", formData, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  })

export const getActiveReports = (token) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/report/active", {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const approveReport = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/report/approve/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const rejectReport = (token, id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/report/reject/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })

export const getReportName = (string) => {
  switch (string) {
    case "hwf": return "Hateful / Wrong / Fake"
    case "hdc": return "Harmful / Defame / Criticism" 
    default : return "Abusive / Sexual / Inappropriate" 
  }
}