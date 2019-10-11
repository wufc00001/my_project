package com.chngc.collect.common;

import com.chngc.core.util.EncryptUtil;

public final class Constants {
    public static final String SUCCESS_CODE = "00";

    public static final String FAIL_CODE = "01";

    // 登录成功
    public static final String LOGINOK = "00";
    public static final String LOGINOK_MSG = "登录成功";
    // 登录失败
    public static final String NOLOGIN_CODE = "99";
    public static final String NOLOGIN_MSG = "登录失败";
    // 没有权限
    public static final String NOPERSSION_CODE = "98";
    public static final String NOPERSSION_MSG = "没有权限";

    // 密码错误
    public static final String PWDERR = "01";
    // 用户不存在
    public static final String USERNOTEXIST = "02";
    // 不是激活用户
    public static final String USERINACTIVE = "03";

    // 初始化密码123456    md5
    public static final String INIT_PASSWORD = "e10adc3949ba59abbe56e057f20f883e";
    // 初始化状态  "ACT"
    public static final String INIT_USER_STATUS = "ACT";
    public static final String EXPERT_APPLICATION_PIC_STANDARD = "/upload/expert/standard/";  //上传原图地址
}
