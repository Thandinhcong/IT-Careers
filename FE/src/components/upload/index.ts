import instance from "../index/instances";

export const UploadImage = (data: any) => {
    const name = `dxzlnojyv`;
    return instance.post(
        `https://api.cloudinary.com/v1_1/${name}/image/upload`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json"
            }
        }
    )
}
export const VND = new Intl.NumberFormat('vi-VN', {
    style: "currency",
    currency: "VND"
})