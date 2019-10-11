package com.chngc.collect.util;

import com.chngc.collect.entity.BusiDictionariesProject;
import com.chngc.collect.entity.CoreUser;
import com.chngc.collect.form.BusiProjectForm;
import com.chngc.collect.vo.CoreUserVo;
import com.chngc.core.util.DateUtils;
import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ConverterUtils {

    public static void converterUserVo(CoreUser user,CoreUserVo userVo){
        userVo.setLoginName(user.getLoginName());
        userVo.setMobile(user.getMobile());
        userVo.setRealName(user.getRealName());
        userVo.setUserId(user.getUserId());
        userVo.setUserStatus(user.getUserStatus());
        if(user.getRoleIds()!=null){
            String[] roleIds = user.getRoleIds().split(",");
            userVo.setRoleIds(roleIds);
        }
    }

    public static void converterFormToBusiProject(BusiProjectForm form, BusiDictionariesProject project, String userId) {
        project.setProjectName(form.getProjectName());
        project.setAbbreviationName(form.getAbbreviationName());
        project.setAnnouncementDay(form.getAnnouncementDay());
        String issueYear = form.getIssuanceDay().substring(0,4);
        project.setIssuanceDay(form.getIssuanceDay());
        project.setIssueYear(issueYear);
        project.setEditTime(new Date());
        project.setEditUser(userId);
        if(form.getId()!=null){
            project.setId(Long.valueOf(form.getId()));
        }
    }
}
