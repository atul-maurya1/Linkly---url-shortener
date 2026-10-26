import apiClient from "../client/apiClient";

export const login = async (email, password) => {
	try {
		const response = await apiClient.post("/auth/login", { email, password });
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message ||
				error.message ||
				"Unable to sign in. Please try again.",
		);
	}
};

export const register = async (email, password, confirmPassword) => {
	try {
		const response = await apiClient.post("/auth/register", {
			email,
			password,
			confirmPassword,
		});
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message ||
				error.message ||
				"Unable to register. Please try again.",
		);
	}
};

export const logout = async () => {
	try {
		const response = await apiClient.post("/auth/logout");
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const verifyEmail = async (otp, email) => {
	try {
		const response = await apiClient.post("/auth/verify-email", { otp, email });
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message ||
				error.message ||
				"Unable to verify your email. Please try again.",
		);
	}
};

export const getUser = async () => {
	try {
		const response = await apiClient.get("/auth/get-user");
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message ||
				error.message ||
				"Unable get user.",
		);
	}
};

export const resendOtp = async (email) => {
    try{

        const response = await apiClient.post('/auth/resend-otp', {email})
        return response.data

    }catch(error){
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Unable to re send OTP "
        );
    }
}

export const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {
    try{
        const response = await apiClient.post('/auth/change-password', {
            oldPassword, 
            newPassword, 
            confirmNewPassword
          }
        )
       return response.data

    }catch(error){
        throw new Error(
            error.response?.data?.message || 
            error.message ||
             "Unable to change password. Please try later"
        )
    }
}



export const forgotPassword = async (email) => {
  try{
     const response = await apiClient.post('/auth/forgot-password', {email})
     return response.data
  }catch(error){
    throw new Error(
        error.response?.data?.message || error.message
        || "Unable to forgot passwword"
    )
  }
}

export const verifyOTP = async (email, otp) => {
    try{
        const response = await apiClient.post('/auth/verify-otp', {email, otp})
        return response.data
    }catch(error){
        throw new Error(
            error.response?.data?.message || error.message
            || "Unable to verify OTP"
        )
    }
}

export const setNewPassword = async (email, password , confirmPassword) => {
    try{
        const response = await apiClient.post('/auth/new-password' {
            email, password , confirmPassword
        })
        return response.data
    }catch(error){
        throw new Error(
            error.response?.data?.message || error.message
            || "Unable to set new password"
        )
    }
}