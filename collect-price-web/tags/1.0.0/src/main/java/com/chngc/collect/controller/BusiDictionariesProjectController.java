package com.chngc.collect.controller;

import com.chngc.collect.common.BaseController;
import com.chngc.collect.common.Constants;
import com.chngc.collect.entity.BusiDictionariesProject;
import com.chngc.collect.form.BusiProjectForm;
import com.chngc.collect.service.BusiDictionariesProjectService;
import com.chngc.collect.util.CheckUtils;
import com.chngc.collect.util.ConverterUtils;
import com.chngc.core.common.ResponseResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/manager/busi_dictionaries_project")
public class BusiDictionariesProjectController extends BaseController {
    @Autowired
    private BusiDictionariesProjectService busiDictionariesProjectService;

    @PostMapping("/save")
    public Mono<ResponseResult> save(HttpServletRequest request, HttpServletResponse response, BusiProjectForm form) {
        // 校验字段
        Map<String, String> map = CheckUtils.checkProjectFiledError(form);
        if (!map.isEmpty()){
            return Mono.justOrEmpty(buildResult(map.get("code"),map.get("msg")));
        }
        BusiDictionariesProject project = busiDictionariesProjectService.save(request,form);
        if(project!=null && project.getId()!=null){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,"保存成功",project));
        }
        return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE,"保存失败"));
    }
    @PostMapping("/list")
    public Mono<ResponseResult> list(HttpServletRequest request, HttpServletResponse response) {
        List<BusiDictionariesProject> project = busiDictionariesProjectService.list();
        return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,new Date().getTime()+"",project));
    }
    @PostMapping("/saveUpdate")
    public Mono<ResponseResult> saveUpdate(HttpServletRequest request, HttpServletResponse response,BusiProjectForm form) {
        String userId = (String) request.getSession().getAttribute("userId");
        BusiDictionariesProject project = new BusiDictionariesProject();
        // 校验字段
        Map<String, String> map = CheckUtils.checkProjectFiledError(form);
        if(!map.isEmpty()){
            return Mono.justOrEmpty(buildResult(map.get("code"),map.get("msg")));
        }
        // 赋值给实体类
        ConverterUtils.converterFormToBusiProject(form,project,userId);
        // 根据id更新实体
        Integer num = busiDictionariesProjectService.saveUpdate(project);
        if(num > 0){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,"修改成功"));
        }
        return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE,"修改失败"));
    }
}
