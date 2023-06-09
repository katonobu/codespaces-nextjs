import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import {XMLParser} from "fast-xml-parser"
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import HandleMainProvisionComponent from '../components/HandleMainProvision'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  useEffect(() => {
    const r = setInterval(() => {
      increment()
    }, 1000)

    return () => {
      clearInterval(r)
    }
  }, [increment])

  const [parsedData, setParsedData] = useState(null);
  useEffect(() => {
    // XMLデータを取得する処理
    const fetchData = async () => {
      const options = {
        ignoreAttributes: false,
      };
      const xp = new XMLParser(options);
      
      // const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/321CONSTITUTION"); // 憲法
      // const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/129AC0000000089"); // 民法
      // const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/140AC0000000045"); // 刑法
      // const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/337AC0000000069"); // 区分所有者法
      // const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/359AC0000000086"); // 電気通信事業法
      const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/325AC0000000131"); // 電波法, Subitem1, TableStruct
      // const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/325M50080000014"); // 電波法施行規則, List
      // const res = await axios.get("https://elaws.e-gov.go.jp/api/1/lawdata/325M50080000018"); // 無線設備規則
  
      const xmlContent = res.data;
      setParsedData(xp.parse(xmlContent));
    };  

    fetchData();
  }, []);  

  return (
    <main className={styles.main}>
      <div>
        {parsedData ? (
          // パースされたデータを表示する処理
//          <pre>{JSON.stringify(parsedData.DataRoot.ApplData.LawFullText.Law.LawBody.MainProvision, null, 2)}</pre>          
          <HandleMainProvisionComponent data={parsedData.DataRoot.ApplData.LawFullText.Law.LawBody.MainProvision}>
          </HandleMainProvisionComponent>
        ) : (
          <p>Loading...</p>
        )}
      </div>      
    </main>
  )
}

export default Home
