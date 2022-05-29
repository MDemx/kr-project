import {axiosInstance} from "./setup";

export const uploadImage = (file: File) => {
    const formData = new FormData();

    formData.append("image", file);

    return axiosInstance
        .post('store-image', formData).then((res) => {
            return res;
        })
}