<template>
  <div>
    <h2>下载Excel</h2>
    <button @click="download">动态a标签</button>
    <br />
    <br />
    <button @click="download2">File-Saver</button>
  </div>
</template>

<script>
import axios from "axios";
import saveAs from "file-saver";
export default {
  methods: {
    download() {
      axios
        .get("http://127.0.0.1:3000/download", {
          responseType: "blob"
        })
        .then(res => {
          if (!res) {
            alert("下载模板文件失败");
            return false;
          }
          const blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          const downloadElement = document.createElement("a");
          const href = window.URL.createObjectURL(blob);
          let contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
          let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
          let result = patt.exec(contentDisposition);
          let filename = decodeURI(result[1]);
          downloadElement.style.display = "none";
          downloadElement.href = href;
          downloadElement.download = filename; //下载后文件名
          downloadElement.click(); //点击下载
          window.URL.revokeObjectURL(href); //释放掉blob对象
        });
    },
    download2() {
      axios("http://127.0.0.1:3000/download", {
        responseType: "blob"
      }).then(res => {
        let contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        let result = patt.exec(contentDisposition);
        let filename = decodeURI(result[1]);
        var file = new Blob([res.data], {
          type: res.headers["content-type"]
        });
        saveAs(file, filename);
      });
    }
  }
};
</script>
