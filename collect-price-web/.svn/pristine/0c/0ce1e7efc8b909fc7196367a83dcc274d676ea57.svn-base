package com.chngc.collect.autoconfigure;

import com.chngc.collect.interceptor.LogInterceptor;
import com.chngc.collect.interceptor.LoginControllerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Bean
    public LogInterceptor getLogInterceptor() {
        return new LogInterceptor();
    }
    @Bean
    public LoginControllerInterceptor getLoginInterceptor() {
        return new LoginControllerInterceptor();
    }

    /**
     * 增加拦截
     * @param registry
     */
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getLogInterceptor()).addPathPatterns("/**");
        registry.addInterceptor(getLoginInterceptor()).addPathPatterns("/manager/**");
    }
}
