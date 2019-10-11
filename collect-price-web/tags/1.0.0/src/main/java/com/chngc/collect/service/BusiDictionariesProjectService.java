package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesProjectMapper;
import com.chngc.collect.entity.BusiDictionariesProject;
import com.chngc.collect.form.BusiProjectForm;
import com.chngc.collect.util.ConverterUtils;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by wufc on 2019/8/23.
 */
@Slf4j
@Service
public class BusiDictionariesProjectService {

    @Autowired
    private BusiDictionariesProjectMapper busiDictionariesProjectMapper;

    /**
     * 新增  字典-纪念币项目
     * @param request
     * @param form
     */
    public BusiDictionariesProject save(HttpServletRequest request, BusiProjectForm form) {
        String userId = (String) request.getSession().getAttribute("userId");
        BusiDictionariesProject project = new BusiDictionariesProject();
        ConverterUtils.converterFormToBusiProject(form,project,userId);
        Long projectId = busiDictionariesProjectMapper.save(project);
        if(projectId > 0){
            Dictionaries.dictionaries_project.add(project);
        }
        return project;
    }

    public List<BusiDictionariesProject> list() {
        List<BusiDictionariesProject> projects= busiDictionariesProjectMapper.list();
        return projects;
    }

    public Integer saveUpdate(BusiDictionariesProject project) {
        Integer num = busiDictionariesProjectMapper.saveUpdate(project);
        if(num > 0){
            List<BusiDictionariesProject> list = Dictionaries.dictionaries_project;
            for (BusiDictionariesProject busiProject: list) {
                if (busiProject.getId().equals(project.getId())) {
                    busiProject.setAbbreviationName(project.getAbbreviationName());
                    busiProject.setProjectName(project.getProjectName());
                    busiProject.setAnnouncementDay(project.getAnnouncementDay());
                    busiProject.setIssuanceDay(project.getIssuanceDay());
                    busiProject.setIssueYear(project.getIssueYear());
                    busiProject.setEditUser(project.getEditUser());
                    busiProject.setEditTime(project.getEditTime());
                    break;
                }
            }
        }
        return num;
    }
}
