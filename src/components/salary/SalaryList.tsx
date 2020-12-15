import { errorToast, httpIsSuccess } from 'components/common/utils'
import { get_salary_list_api } from 'http/Salary'
import React, { useEffect, useState } from 'react'
import 'styles/salary/salaryList.scss'
const stylePrefix = 'salary-salaryList'

interface SalaryListConfig {
    userID: number;
}

interface CaseItem {
    case_name: string, //案件名称
    identity: string,//主办人还是协办人
    generalSalary: number,//总律师费
    salary: number, //该案件分得的律师费
    ratio: number,//该用户占该案件的金额比例
}

interface YearSalaryItem {
    year: number,//年份
    year_salary: number,//该年总收入
    case_list: CaseItem[]
}

export default function SalaryList({ userID }: SalaryListConfig) {
    const [salaryList, setSalaryList] = useState<YearSalaryItem[]>([])
    const getSalaryList = async () => {
        const res = await get_salary_list_api({ userID })
        if (httpIsSuccess(res.code)) {
            setSalaryList(res.data)
        } else {
            errorToast(res.message)
        }
    }
    useEffect(() => {
        getSalaryList()
    }, [userID])
    return (
        <div className={`${stylePrefix}-layout`} >
            {
                salaryList.map((salary, index) => {
                    return <div
                        key={index}
                        className={`${stylePrefix}-salary-item-layout`}
                    >
                        <p className={`${stylePrefix}-year`}>年份：{salary.year}</p>
                        <p className={`${stylePrefix}-year`}>年度总收入：{salary.year_salary}</p>
                        {
                            salary.case_list.map((caseItem, key) => {
                                return <div
                                    key={key}
                                    className={`${stylePrefix}-case-item`}
                                >
                                    <span>{caseItem.case_name}</span>
                                    <span>{caseItem.identity}</span>
                                    <span>{caseItem.salary}</span>
                                    <span>{caseItem.ratio}</span>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}
