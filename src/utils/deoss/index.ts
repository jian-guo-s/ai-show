import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { UploadChangeParam } from 'ant-design-vue';

export interface AuthData {
    account: string,
    message: string,
    signature: number[]
}

const baseUrl = 'http://35.227.119.161:8080'
const defaultBucketName = 'hamster-guo'
const deShareUrl = 'https://d.cess.cloud/'
const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiY1hna0tNMkRYYXZHM20yOHNjR3E2N0U5VnJpZmFwV0ZZaUhTVUx2cjNBaXV2dlZxdiIsImV4cCI6MTY5MDM1NTU1OCwibmJmIjoxNjg3NzYzNDk4fQ.1BWfkaHUV-q3prCaRY9Nyqipmq-a5-p9ywEqMQc39yQ'

export function postAuth(data: AuthData): Promise<any> {
    const url = baseUrl.concat('/auth');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return axios.post(url, data, config)
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
            throw new Error(error.message);
        });
}


export function uploadFile(fileData: any, authToken: string,fileName: string): Promise<any> {
    const url = baseUrl.concat('/',fileName);
    const config = {
        headers: {
            'Authorization': authToken,
            'BucketName': defaultBucketName,
            'Content-Type': 'multipart/form-data; boundary=WebAppBoundary',
        },
    };

    // 构建 FormData 对象
    const formData = new FormData();
    formData.append('file', fileData, fileName);

    return axios.put(url, formData, config)
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
            throw new Error(error.message);
        });
}

export function downLoadFile(fileId: string): Promise<any> {
    const url = baseUrl.concat('/',fileId);
    const config = {
        headers: {
            'Operation': 'download',
            'Content-Type': 'application/json',
        },
    };

    return axios.get(url, config)
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
            throw new Error(error.message);
        });
}

export async function uploadFileToCloud(info: any,fileName:string): Promise<any> {
    const data:any = await convertToBlob(info)
    const url = deShareUrl.concat(fileName);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=WebAppBoundary',
        },
    };

    // 构建 FormData 对象
    const formData = new FormData();
    formData.append('file', data, fileName);

    return axios.post(url, formData, config)
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
            throw new Error(error.message);
        });
}

function convertToBlob(info: UploadChangeParam): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const { file } = info;
      const reader = new FileReader();
  
      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer]);
        resolve(blob);
      };
      reader.onerror = () => {
        reject(new Error('Failed to convert File to Blob'));
      };
  
      reader.readAsArrayBuffer(file.originFileObj as File);
    });
  }