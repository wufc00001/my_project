package com.chngc.collect.controller;

import com.chngc.collect.common.BaseController;
import com.chngc.collect.common.Constants;
import com.chngc.collect.entity.BusiDictionariesPriceType;
import com.chngc.collect.entity.BusiDictionariesShape;
import com.chngc.collect.service.BusiDictionariesShapeService;
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
@RequestMapping("/manager/busi_dictionaries_shape")
@RestController
public class BusiDictionariesShapeController extends BaseController {
    @Autowired
    private BusiDictionariesShapeService busiDictionariesShapeService;

    @PostMapping(value = "/list")
    public Mono<ResponseResult> list(HttpServletRequest request, HttpServletResponse response) {
        List<BusiDictionariesShape> list = busiDictionariesShapeService.findAll();
        return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE, new Date().getTime() + "", list));
    }

    @PostMapping(value = "/save")
    public Mono<ResponseResult> save(HttpServletRequest request, HttpServletResponse response) {
        String userId = (String) request.getSession().getAttribute("userId");
        String value = request.getParameter("dictionariesValue");
        if(StringUtils.isBlank(value)){
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "形状不能为空" ));
        }
        if(value.length()>50){
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "形状长度不能超过50个字符" ));
        }
        BusiDictionariesShape busiDictionariesShape=new BusiDictionariesShape();
        busiDictionariesShape.setDictionariesValue(value);
        busiDictionariesShape.setEditUser(userId);
        busiDictionariesShape.setEditTime(new Date());
        BusiDictionariesShape shape = busiDictionariesShapeService.save(busiDictionariesShape);
        if (shape!=null&&shape.getId()!=null) {
            Dictionaries.dictionaries_shape.add(busiDictionariesShape);
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE, "保存成功", shape));
        }else{
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE,  "保存失败"));
        }
    }

    @PostMapping(value = "/saveUpdate")
    public Mono<ResponseResult> saveUpdate(HttpServletRequest request, HttpServletResponse response){
        String userId = (String) request.getSession().getAttribute("userId");
        String dictionariesValue = request.getParameter("dictionariesValue");
        Long id =  Long.valueOf(htmlEscape(request.getParameter("id")));
        if(StringUtils.isBlank(dictionariesValue)){
            return Mono.justOrEmpty(buildResult("02", "形状不能为空"));
        }
        if(dictionariesValue.length()>50){
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "形状长度不能超过50个字符" ));
        }
        BusiDictionariesShape busiDictionariesShape=new BusiDictionariesShape();
        busiDictionariesShape.setId(id);
        busiDictionariesShape.setDictionariesValue(dictionariesValue);
        busiDictionariesShape.setEditUser(userId);
        int num = busiDictionariesShapeService.saveUpdate(busiDictionariesShape);
        if(num > 0){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE, "修改成功"));
        }
        return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE, "修改失败"));
    }
}