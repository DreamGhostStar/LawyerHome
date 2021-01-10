import { testIP } from "components/common/config"
import { getHeaders } from "components/common/utils"
import { DailyPhoneType } from "components/home/phone/DailyPhoneList"
import Http from "./Servies"

interface IGetUnitPhone {
    unitID: number | null;
}
interface IAddUnitPhone {
    unitID: number | null;
    value: string;
    type: DailyPhoneType;
}

// 获取单位和日常电话
export const get_unit_phone_api = async (data: IGetUnitPhone) => {
    return await Http.request(`${testIP}/admin/unit`, data, 'GET', getHeaders())
}

// 增加日常电话和单位
export const add_unit_phone_api = async (data: IAddUnitPhone) => {
    return await Http.request(`${testIP}/admin/unit`, data, 'POST', getHeaders())
}

// 删除日常电话和单位
export const remove_unit_phone_api = async (data: IGetUnitPhone) => {
    return await Http.request(`${testIP}/admin/unit`, data, 'DELETE', getHeaders())
}