document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
var closedIssues=0;

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random()*100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    //e.preventDefault();
}

function setStatusClosed(id){
  closeIssue(id);
}


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description=currentIssue.description.strike();
  console.log(issues);
  localStorage.setItem('issues', JSON.stringify(issues));
  closedIssues++;
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  index=issues.indexOf(issues.find(issue=>issue.id==id));
  if(index>-1){
    console.log(index);
    issues.splice(index,1);
  }
  localStorage.setItem("issues",JSON.stringify(issues));
  closedIssues--;
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  var closed = document.getElementById('closedIssues');
  var islen = document.getElementById('totalIssues');
  (closedIssues>0)?closed.innerText=closedIssues:closed.innerText="";
  issues.length>0?islen.innerText='('+issues.length+')':islen.innerText='(0)'
     

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well" id=${id}>
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 class="desc"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> <span class="sevr">${severity}</span></p>
                              <p><span class="glyphicon glyphicon-user"></span><span class="assgn"> ${assignedTo}</span></p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
