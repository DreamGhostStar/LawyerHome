import { backIP } from "components/common/config"
import { getToken } from "components/common/utils"
import Http from "./Servies"

// 新建案件
export const upload_file_api = async (data: FormData) => {
    return await Http.request(`${backIP}/public/upload`, data, 'POST', {
        'Authorization': getToken(),
        'Content-Type': "multipart/form-data"
    })
}