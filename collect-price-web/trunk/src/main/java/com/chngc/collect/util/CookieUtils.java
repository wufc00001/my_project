package com.chngc.collect.util;

import com.chngc.core.util.EncryptUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * Cookie工具类
 */
@Component
public class CookieUtils {
    private static final Integer DEFAULT_COOKIE_AGE = 60 * 60 * 24;


    /**
     * 设置 Cookie（有效期默认一天）
     *
     * @param name  名称
     * @param value 值
     */
    public  void setCookie(HttpServletResponse response, String name, String value, boolean httpOnly) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setHttpOnly(httpOnly);
        cookie.setValue(value);
        response.addCookie(cookie);
    }

    /**
     * 设置 Cookie
     *
     * @param name   名称
     * @param value  值
     * @param maxAge 生存时间（单位秒）
     */
    public  void setCookie(HttpServletResponse response, String name, String value, int maxAge, boolean httpOnly, String cookieDomain) {
        Cookie cookie = new Cookie(name, null);
        cookie.setDomain(cookieDomain);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        cookie.setHttpOnly(httpOnly);
        cookie.setValue(value);
        response.addCookie(cookie);
    }

    /**
     * 设置 Cookie
     *
     * @param name   名称
     * @param value  值
     * @param maxAge 生存时间（单位秒）
     * @param httpOnly 是否设置HttpOnly
     */
    public  void setCookie(HttpServletResponse response, String name, String value, int maxAge, boolean httpOnly) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        cookie.setHttpOnly(httpOnly);
        cookie.setValue(value);
        response.addCookie(cookie);
    }

    /**
     * 获得指定Cookie的值
     *
     * @param request 请求对象
     * @param name    名字
     * @return 值
     */
    public  String getCookie(HttpServletRequest request, String name) {
        String value = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    value = cookie.getValue();
                    break;
                }
            }
        }
        return value;
    }

    /**
     * 清除指定cookie的方法cookie的方法  QuMingyang
     *
     * @param s cookie字符串
     * @return
     */
    public void delCookie(HttpServletResponse response, String... s) {
        for (String cookieName : s) {
            Cookie cookie = new Cookie(cookieName, null);
            cookie.setPath("/");
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
    }

    /**
     * @Author: houjw
     * @Description: 清除所有cookie
     * @Date: 17:29 2017/11/28
     */
    public void clearCookie(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (int i = 0; i < cookies.length; i++) {
                cookies[i].setPath("/");
                cookies[i].setMaxAge(0);
                response.addCookie(cookies[i]);
            }
        }
    }

    public static String generateToken(String key) {
        Date date = new Date();
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        // 设置token过期时间为20分钟
        calendar.add(calendar.MINUTE, 20);
        // 得到过期的秒数
        String expires = String.valueOf(calendar.getTimeInMillis() / 1000);
        String tokenMsg = EncryptUtil.toBASE64(key + "," + expires);
        String signature = EncryptUtil.toBASE64(EncryptUtil.getMD5("ni-cai-cai!" + "" + tokenMsg));
        StringBuffer sb = new StringBuffer();
        sb.append(tokenMsg).append("." + EncryptUtil.getMD5("so-what?").toLowerCase() + ".").append(signature);
        try {
            return URLEncoder.encode(sb.toString(),"utf-8");
        } catch (UnsupportedEncodingException e) {
        }
        return null;
    }

}
