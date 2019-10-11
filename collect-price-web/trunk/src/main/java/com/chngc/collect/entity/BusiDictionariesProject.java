package com.chngc.collect.entity;


import java.io.Serializable;
import java.util.Date;

public class BusiDictionariesProject implements Serializable {

  private Long id;
  private String projectName;
  private String abbreviationName;
  private String issueYear;
  private String announcementDay;
  private String issuanceDay;
  private Date editTime;
  private String editUser;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getProjectName() {
    return projectName;
  }

  public void setProjectName(String projectName) {
    this.projectName = projectName;
  }

  public String getAbbreviationName() {
    return abbreviationName;
  }

  public void setAbbreviationName(String abbreviationName) {
    this.abbreviationName = abbreviationName;
  }

  public String getIssueYear() {
    return issueYear;
  }

  public void setIssueYear(String issueYear) {
    this.issueYear = issueYear;
  }

  public String getAnnouncementDay() {
    return announcementDay;
  }

  public void setAnnouncementDay(String announcementDay) {
    this.announcementDay = announcementDay;
  }

  public String getIssuanceDay() {
    return issuanceDay;
  }

  public void setIssuanceDay(String issuanceDay) {
    this.issuanceDay = issuanceDay;
  }

  public Date getEditTime() {
    return editTime;
  }

  public void setEditTime(Date editTime) {
    this.editTime = editTime;
  }

  public String getEditUser() {
    return editUser;
  }

  public void setEditUser(String editUser) {
    this.editUser = editUser;
  }
}
