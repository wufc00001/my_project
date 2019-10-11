package com.chngc.collect.controller;

import com.chngc.collect.common.BaseController;
import com.chngc.collect.common.Constants;
import com.chngc.collect.entity.BusiDictionariesMaterial;
import com.chngc.collect.service.BusiDictionariesMaterialService;
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
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/manager/busi_dictionaries_material")
public class BusiDictionariesMaterialController extends BaseController {
    @Autowired
    private BusiDictionariesMaterialService busiDictionariesMaterialService;

    @PostMapping("/save")
    public Mono<ResponseResult> save(HttpServletRequest request, HttpServletResponse response) {
        String dictionariesValue = request.getParameter("dictionariesValue");
        if (StringUtils.isBlank(dictionariesValue)){
            return Mono.justOrEmpty(buildResult("02","材质名称不能为空"));
        }
        if (dictionariesValue.length()> 50){
            return Mono.justOrEmpty(buildResult("03","材质名称长度不能大于50个字符"));
        }
        String userId = (String) request.getSession().getAttribute("userId");
        BusiDictionariesMaterial material = new BusiDictionariesMaterial();
        material.setDictionariesValue(dictionariesValue);
        material.setEditTime(new Date());
        material.setEditUser(userId);
        Long materialId = busiDictionariesMaterialService.save(material);
        if(materialId > 0){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,"保存成功",material));
        }
        return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE,"保存失败"));
    }
    @PostMapping("/list")
    public Mono<ResponseResult> list(HttpServletRequest request, HttpServletResponse response) {
        List<BusiDictionariesMaterial> project = busiDictionariesMaterialService.list();
        return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,new Date().getTime()+"",project));
    }
    @PostMapping("/saveUpdate")
    public Mono<ResponseResult> saveUpdate(HttpServletRequest request, HttpServletResponse response) {
        String dictionariesValue = request.getParameter("dictionariesValue");
        if (StringUtils.isBlank(dictionariesValue)){
            return Mono.justOrEmpty(buildResult("02","材质名称不能为空"));
        }
        if (dictionariesValue.length()> 50){
            return Mono.justOrEmpty(buildResult("03","材质名称长度不能大于50个字符"));
        }
        String id = request.getParameter("id");
        String userId = (String) request.getSession().getAttribute("userId");
        BusiDictionariesMaterial material = new BusiDictionariesMaterial();
        material.setId(Long.valueOf(id));
        material.setEditUser(userId);
        material.setEditTime(new Date());
        material.setDictionariesValue(dictionariesValue);
        // 根据id更新实体
        Integer num = busiDictionariesMaterialService.saveUpdate(material);
        if(num > 0){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,"修改成功"));
        }
        return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE,"修改失败"));
    }
}
