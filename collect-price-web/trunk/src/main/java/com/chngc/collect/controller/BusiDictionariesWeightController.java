package com.chngc.collect.controller;

import com.chngc.collect.common.BaseController;
import com.chngc.collect.common.Constants;
import com.chngc.collect.entity.BusiDictionariesWeight;
import com.chngc.collect.service.BusiDictionariesWeightService;
import com.chngc.collect.util.Dictionaries;
import com.chngc.core.common.ResponseResult;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Slf4j
@RequestMapping("/manager/busi_dictionaries_weight")
@RestController
public class BusiDictionariesWeightController extends BaseController {
    @Autowired
    private BusiDictionariesWeightService busiDictionariesWeightService;

    @PostMapping(value = "/list")
    public Mono<ResponseResult> list(HttpServletRequest request, HttpServletResponse response) {
       List<BusiDictionariesWeight> list = busiDictionariesWeightService.findAll();
        return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE, new Date().getTime() + "", list));
    }

    @PostMapping(value = "/save")
    public Mono<ResponseResult> save(HttpServletRequest request, HttpServletResponse response) {
        String userId = (String) request.getSession().getAttribute("userId");
        String value = request.getParameter("dictionariesValue");
        if(StringUtils.isBlank(value)){
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "重量单位不能为空" ));
        }
        if(value.length()>50){
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "重量单位长度不能超过50个字符" ));
        }
        BusiDictionariesWeight busiDictionariesWeight=new BusiDictionariesWeight();
        busiDictionariesWeight.setEditUser(userId);
        busiDictionariesWeight.setEditTime(new Date());
        busiDictionariesWeight.setDictionariesValue(value);
        BusiDictionariesWeight weight = busiDictionariesWeightService.save(busiDictionariesWeight);
        if (weight!=null&&weight.getId()!=null) {
            Dictionaries.dictionaries_weight.add(busiDictionariesWeight);
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE, "保存成功", weight));
        }else{
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "保存失败"));
        }
    }
    @PostMapping(value = "/saveUpdate")
    public Mono<ResponseResult> saveUpdate(HttpServletRequest request, HttpServletResponse response){
        String userId = (String) request.getSession().getAttribute("userId");
        String dictionariesValue = request.getParameter("dictionariesValue");
        Long id =  Long.valueOf(htmlEscape(request.getParameter("id")));
        if(StringUtils.isBlank(dictionariesValue)){
            return Mono.justOrEmpty(buildResult("02", "重量单位不能为空"));
        }
        if(dictionariesValue.length()>50){
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "重量单位长度不能超过50个字符" ));
        }
        BusiDictionariesWeight busiDictionariesWeight=new BusiDictionariesWeight();
        busiDictionariesWeight.setId(id);
        busiDictionariesWeight.setDictionariesValue(dictionariesValue);
        busiDictionariesWeight.setEditUser(userId);
        int num = busiDictionariesWeightService.saveUpdate(busiDictionariesWeight);
        if(num > 0){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE, "修改成功"));
        }
        return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "修改失败"));
    }
}