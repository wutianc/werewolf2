<%@ page language="java"  pageEncoding="utf-8"%>
<%@ page import="nds.control.web.UserWebImpl" %>
<%@ page import="nds.control.web.WebUtils" %>
<%@ page import="nds.query.QueryEngine" %>
<%@ page import="java.util.List" %>

<%
 nds.portlet.util.UserUtils.initPageContext(request, response); // portal4.0
  String NDS_PATH=nds.util.WebKeys.NDS_URI;
  String contextPath="";
  int RES_TOTAL=1024;
  int DEFAULT_TAB_WIDTH=740;
  nds.control.web.UserWebImpl userWeb =null;
  if(com.liferay.portal.util.ShutdownUtil.isShutdown()){
    session.invalidate();
  }
  try{
    userWeb= ((nds.control.web.UserWebImpl)nds.control.web.WebUtils.getSessionContextManager(session).getActor(nds.util.WebKeys.USER)); 
  }catch(Throwable userWebException){
    System.out.println("########## found userWeb=null##########"+userWebException);
  }
  
if(userWeb==null || userWeb.isGuest()){
  if(request.getParameter("checkSession")!=null){out.write("noSession");return;}
  String redirect=java.net.URLEncoder.encode(request.getRequestURI()+"?"+request.getQueryString() ,"UTF-8");
   response.sendRedirect("/c/portal/login?redirect="+redirect);
  return;
}

//查询门店当前状态
 List v=QueryEngine.getInstance().doQueryList("select a.id,a.name,a.room_num,a.status,a.type  from ROOM  a where a.isactive='Y'");  
 
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<title>游戏大厅</title>
		<link rel="stylesheet" type="text/css" href="dist/css/bootstrap.min.css"/>
		<link rel="stylesheet" type="text/css" href="css/games.css"/>
		<script src="js/jquery-2.0.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/gamesLobby.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div class="header">
			
		</div>
		<div class="container-fluid rooms">
			<div class="row">
				<div class="col-lg-6">
   <%
    if(v.size()>0){
       for(int j=0;j< v.size();j++){
     String ID=((List)v.get(j)).get(0).toString(); 
     String NAME=((List)v.get(j)).get(1).toString();
     String STATUS=((List)v.get(j)).get(2).toString();
     String TYPE=((List)v.get(j)).get(3).toString();
     String ROOMNUM=((List)v.get(j)).get(4).toString();
     %>
	      	<div class="room">
				<div class="roomTop">
					<span class="roomName"><%=NAME%></span>
					<span class="roomNum"><i class="glyphicon glyphicon-align-justify"></i><a href="#">详情</a></span>
				</div>
				<div class="container-fluid seats">
					<div class="container-fluid">
						<div class="row">
			<%
				List y=QueryEngine.getInstance().doQueryList("select a.name from SEAT t, C_ROL a,room b where t.isactive = 'Y' and b.room_num=<%=ROOMNUM%>  and t.ad_org_id=a.id and t.room_id=b.id;");
				String NAME=((List)y.get(j)).get(0).toString();
			    
			    for(int j=0;j<12;j++){
			       	if(y.size()<=j){
			     
			%>
							
						<div class="col-xs-3">
							<div class="seat">
								<%=NAME%>
							</div>
						</div>
				<%
				}else{
					<%
						<div class="col-xs-3">
							<div class="seat">
								空闲
							</div>
						</div>
					%>
					
					}
				}
				%>			
							
						</div>
					</div>
				</div>
			
					<%
						if(TYPE=="1"){
							%>
						<div class="roomBtn">
							<a href="javascript:void(0)">查看游戏状态</a>
							<%
						}else if(
							%>
						<div class="roomBtn">
							<a href="javascript:void(0)">开始游戏</a>
						</div>
							<%
						)
							
					%>
					
				
			</div>	
     <% 
    
    }
  }
     %>   
			</div>
 		</div>
	</div>
</body>