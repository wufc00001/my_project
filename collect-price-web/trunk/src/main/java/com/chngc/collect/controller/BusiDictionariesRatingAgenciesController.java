package com.chngc.collect.controller;

import com.chngc.collect.common.BaseController;
import com.chngc.collect.common.Constants;
import com.chngc.collect.entity.BusiDictionariesRatingAgencies;
import com.chngc.collect.service.BusiDictionariesRatingAgenciesService;
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

/**
 * @Author:
 * @Description:字典-鉴定评级机构
 * @Date:Create：in 2019/8/29 16:22
 * @Modified By：
 */
@Slf4j
@RestController
@RequestMapping("/manager/busi_dictionaries_rating_agencies")
public class BusiDictionariesRatingAgenciesController extends BaseController {

    @Autowired
    private BusiDictionariesRatingAgenciesService busiDictionariesRatingAgenciesService;

    /**
     * 保存
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/save")
    public Mono<ResponseResult> save(HttpServletRequest request, HttpServletResponse response) {
        String dictionariesValue = request.getParameter("dictionariesValue");
        if (StringUtils.isBlank(dictionariesValue)){
            return Mono.justOrEmpty(buildResult("01","鉴定评级机构不能为空"));
        }
        if (dictionariesValue.length()> 50){
            return Mono.justOrEmpty(buildResult("02","鉴定评级机构长度不能大于50个字符"));
        }
        String userId = (String) request.getSession().getAttribute("userId");
        BusiDictionariesRatingAgencies agencies = new BusiDictionariesRatingAgencies();
        agencies.setDictionariesValue(dictionariesValue);
        agencies.setEditTime(new Date());
        agencies.setEditUser(userId);
        int save = busiDictionariesRatingAgenciesService.save(agencies);
        if(save > 0){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,"保存成功",agencies));
        } else {
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE,"保存失败"));
        }
    }

    /**
     * 列表
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/list")
    public Mono<ResponseResult> list(HttpServletRequest request, HttpServletResponse response) {
        List<BusiDictionariesRatingAgencies> project = busiDictionariesRatingAgenciesService.list();
        return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,new Date().getTime()+"",project));
    }

    /**
     * 修改保存
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/saveUpdate")
    public Mono<ResponseResult> saveUpdate(HttpServletRequest request, HttpServletResponse response) {
        String dictionariesValue = request.getParameter("dictionariesValue");
        if (StringUtils.isBlank(dictionariesValue)){
            return Mono.justOrEmpty(buildResult("01","鉴定评级机构不能为空"));
        }
        if (dictionariesValue.length()> 50){
            return Mono.justOrEmpty(buildResult("02","鉴定评级机构长度不能大于50个字符"));
        }
        String strId = request.getParameter("id");
        if (StringUtils.isBlank(strId)){
            return Mono.justOrEmpty(buildResult("03","id不能为空"));
        }
        Long id;
        try {
            id = Long.valueOf(strId);
        }catch (Exception e){
            return Mono.justOrEmpty(buildResult("04","id不是数字类型"));
        }
        String userId = (String) request.getSession().getAttribute("userId");
        BusiDictionariesRatingAgencies agencies = new BusiDictionariesRatingAgencies();
        agencies.setId(id);
        agencies.setEditUser(userId);
        agencies.setEditTime(new Date());
        agencies.setDictionariesValue(dictionariesValue);
        // 根据id更新实体
        int i = busiDictionariesRatingAgenciesService.saveUpdate(agencies);
        if(i > 0){
            return Mono.justOrEmpty(buildResult(Constants.SUCCESS_CODE,"修改成功"));
        } else {
            return Mono.justOrEmpty(buildResult(Constants.FAIL_CODE,"修改失败"));
        }
    }
}
