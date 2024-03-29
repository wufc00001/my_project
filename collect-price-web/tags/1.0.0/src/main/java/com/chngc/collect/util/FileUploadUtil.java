package com.chngc.collect.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.*;

public class FileUploadUtil {
   private static String phyPathweb="/data/App";
//    private static String phyPathweb="D:/data/App";
    public static Map<String, String> uploadImgFiles(MultipartFile files[], String path,HttpServletRequest request) {
        Map<String,String> resources=new HashMap();
        String phyPath="upload/";
        String phyPathweb = request.getRealPath("/");
        File uploadDirectory = new File(path);
        if (uploadDirectory.exists()) {
            if (!uploadDirectory.isDirectory()) {
                uploadDirectory.delete();
            }
        } else {
            uploadDirectory.mkdir();
        }
        //这里可以支持多文件上传
        if (files != null && files.length >= 1) {
            BufferedOutputStream bw = null;
            try {
                for (MultipartFile file : files) {
                    String fname = file.getOriginalFilename();
                    if (StringUtils.isBlank(fname)) {
                        resources.put("", null);
                        continue;
                    }
                    String[] fnames = fname.split("\\.");
                    String extName = "";
                    if (fnames.length > 1) {
                        extName = fnames[fnames.length - 1];
                    }
//				String newFileName = fnames[0] + "_" + makeFileName() + "." + extName;
                    String newFileName = makeFileName() + "." + extName;
                    String newFolderName = makeFolderName();
                    if (path.trim().equals("/upload/"))
                        newFolderName = "";
                    if (!FileBean.fileExists(phyPath + path + newFolderName)) {
                        FileBean.makeDir(phyPath + path + newFolderName, true);
                    }
                    InputStream in = file.getInputStream();
                    OutputStream out = new FileOutputStream(FileBean.formatPath(phyPath + path + newFolderName + "/"
                            + newFileName));
                    if (!FileBean.fileExists(phyPathweb + path + newFolderName)) {
                        FileBean.makeDir(phyPathweb + path + newFolderName, true);
                    }
                    OutputStream outs = new FileOutputStream(FileBean.formatPath(phyPathweb + path + newFolderName + "/"
                            + newFileName));
                    int bytesRead;
                    byte[] buffer = new byte[8192];
                    while ((bytesRead = in.read(buffer, 0, 8192)) != -1) {
                        out.write(buffer, 0, bytesRead);
                        outs.write(buffer, 0, bytesRead);
                    }
                    out.close();
                    outs.close();
                    in.close();

                    resources.put(file.getName(), path + newFolderName + "/" + newFileName);
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                try {
                    if (bw != null) {
                        bw.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return resources;
    }

    public static String makeFileName() {
        Date date = new Date();
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTime(date);
        return new String("" + gc.getTimeInMillis() + new Random().nextInt(1000));
    }

    public static String makeFolderName() {
        Date date = new Date();
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTime(date);
        String monthPreStr = (gc.get(GregorianCalendar.MONTH) < 9 ? "0" : "");
        String dayPreStr = (gc.get(GregorianCalendar.DATE) < 10 ? "0" : "");
        return new String(gc.get(GregorianCalendar.YEAR) + monthPreStr + (gc.get(GregorianCalendar.MONTH) + 1)
                + dayPreStr + gc.get(GregorianCalendar.DATE));
    }

    /**
     * base64字符串转换成图片
     * @param imgStr		base64字符串
     * @param imgFilePath	图片存放路径
     * @return
     *
     * @author ZHANGJL
     * @dateTime 2018-02-23 14:42:17
     */
    public static boolean Base64ToImage(String imgStr,String imgFilePath) { // 对字节数组字符串进行Base64解码并生成图片
        if (StringUtils.isEmpty(imgStr)) // 图像数据为空
            return false;
        imgStr = imgStr.substring(imgStr.indexOf(",")+1);
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            // Base64解码
            byte[] b = decoder.decodeBuffer(imgStr);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {// 调整异常数据
                    b[i] += 256;
                }
            }
            imgFilePath=phyPathweb+imgFilePath;
            String parh=imgFilePath.substring(0,imgFilePath.lastIndexOf("/"));
            File file = new File(parh);
            if(!file.exists()){
                file.mkdirs();
            }
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(b);
            out.flush();
            out.close();

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}