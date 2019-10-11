package com.chngc.collect.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Data
public class Uploader {
    private String fileName = "";
    private int maxSize = 1 * 1024 * 1024; // 1M
    private int minSize = 0;
    private int minHeight;
    private int maxHeight;
    private int minWidth;
    private int maxWidth;
    private String savePath;
    //允许上传的文件类型
    //private String allowFiles[] = { ".doc", ".docx", ".pdf", ".txt", ".swf", ".wmv", ".gif", ".png", ".jpg", ".jpeg",".bmp", ".flv", "xls"};
    //private String[] allowFiles = {"jpg", "jpeg", "gif", "png", "bmp"};
    private String[] allowFiles = {"jpg", "png", "jpeg", "gif", "bmp"};
    private static Map<String, String> errorInfo = new HashMap<String, String>();

    static {
        errorInfo.put("SUCCESS", "SUCCESS");
        errorInfo.put("NOFILE", "未包含文件上传域");
        errorInfo.put("TYPE", "不允许的文件格式");
        errorInfo.put("SIZE", "文件大小超出限制");
        errorInfo.put("ENTYPE", "请求类型错误");
        errorInfo.put("REQUEST", "上传请求异常");
        errorInfo.put("IO", "IO异常");
        errorInfo.put("DIR", "目录创建失败");
        errorInfo.put("UNKNOWN", "未知错误");
        errorInfo.put("HEIGHT", "高不符合要求");
        errorInfo.put("WIDTH", "宽不符合要求");
        errorInfo.put("TYPE_CMYK", "不能使用CMYK印刷模式的图片");
        errorInfo.put("AUTH", "请联系管理员授权");
        errorInfo.put("NOSAVEPATH", "请设置文件保存路径");
    }

    /**
     * 获取错误信息
     * @param key
     * @return
     */
    public static String getErrorInfo(String key) {
        return errorInfo.get(key);
    }
}
