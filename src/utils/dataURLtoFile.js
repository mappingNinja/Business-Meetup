
export const createImage = (url) =>
new Promise((resolve, reject) => {
  const image = new Image();
  image.addEventListener("load", () => resolve(image));
  image.addEventListener("error", (error) => reject(error));
  image.setAttribute("crossOrigin", "anonymous"); 
  image.src = url;
});


    export const dataURLtoFile = (dataurl, filename) =>{
        console.log("alert",dataurl)
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }


    export default async function getCroppedImgr(
        imageSrc
      ) {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");   
        // ctx.width = 400 + 'px';
        // ctx.height = 400 + 'px';
        ctx.drawImage(image, 0, 0,400,400);
        return new Promise((resolve, reject) => {
            resolve(canvas.toDataURL());
            // canvas.toBlob((file) => {
            //   resolve(URL.createObjectURL(file));
            // }, "image/jpeg");
          });
    } 