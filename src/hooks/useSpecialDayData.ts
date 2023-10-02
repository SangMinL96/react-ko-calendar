import { useCallback, useEffect, useState } from "react";
import xml2js from "xml2js";

type Props = {
  year: number;
  month: number;
};

export const useSpecialDayData = async ({ year, month }: Props) => {
  const [data, setData] = useState([]);
  const getRestDeInfo = useCallback(async () => {
    try {
      const realMonth = month < 10 ? `0${month}` : month;
      const key = process.env.REACT_APP_KEY;
      const xhr = new XMLHttpRequest();
      const url =
        "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo"; /*URL*/
      let queryParams = `?serviceKey=${key}&solYear=${year}&solMonth=${realMonth}`;
      xhr.open("GET", url + queryParams);
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          xml2js.parseString(this.responseText, (err, { response }) => {
            if (err) {
              console.error("XML 파싱 오류:", err);
            } else {
              setData(response?.body?.[0]?.items?.[0]?.item);
            }
          });
        }
      };
      xhr.send("");
    } catch (err) {
      console.error(err);
    }
  }, [year, month]);

  useEffect(() => {
    getRestDeInfo();
  }, [getRestDeInfo]);
  return data;
};
