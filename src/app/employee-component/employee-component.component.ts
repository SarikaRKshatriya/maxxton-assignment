import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.scss']
})
export class EmployeeComponentComponent implements OnInit {

  public candidate_data=[];
  public candidateData=[];
  public deptData=[];
  public searchValue: string;
  public showDept:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.candidate_data=[ {
      "id": 11,
      "name": "Ash",
      "department": "Finance",
      "joining_date": "8/10/2016"
  },
  {"id": 12,"name": "John","department": "HR","joining_date": "18/1/2011"},
  { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": "28/11/2019"},
  {"id": 14,  "name": "Vish",  "department": "Development",   "joining_date": "7/7/2017"},
  { "id": 15, "name": "Barry",  "department": "Operations", "joining_date": "19/8/2014"},
  {"id": 16,"name": "Ady",  "department": "Finance",  "joining_date": "5/10/2014"}, 
  { "id": 17,"name": "Gare","department": "Development",  "joining_date": "6/4/2014"},
  { "id": 18,  "name": "Hola",  "department": "Development",  "joining_date": "8/12/2010"}, 
  {"id": 19,  "name": "Ola",  "department": "HR",  "joining_date": "7/5/2011"},
  { "id": 20,  "name": "Kim",  "department": "Finance",  "joining_date": "20/10/2010"}];
  this.candidateData = this.candidate_data;
  }
  allCandidates(){
    this.showDept = false;
    this.candidateData = this.candidate_data;
  }
  sortByName(){
    this.showDept = false;
    let sortData = this.candidate_data;
    let sorted = sortData.sort((candidate1, candidate2) => {
            let date1= new Date(candidate1.joining_date);
            let date2= new Date(candidate2.joining_date);
            if (candidate1.name.toUpperCase() < candidate2.name.toUpperCase()) {
                return -1;
            }
            else if (candidate1.name.toUpperCase() == candidate2.name.toUpperCase() && date1 < date2) {
                return -1;
            }
            return 1;
        });
        this.candidateData = sorted;  
    }
  
  searchByName(){
    this.showDept = false;
    let searchedData = this.candidate_data.filter(candidate => candidate.name.toUpperCase() == this.searchValue.toUpperCase());
    this.candidateData = searchedData;
  }
  experience(){
    this.showDept = false;
    let experienceData = this.candidate_data;
    let twoYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 2));
    experienceData = experienceData.filter(candidate =>{
       let candidatedata = candidate.joining_date.split('/');
       let candidatedate = candidatedata[1] +'/'+ candidatedata[0] +'/'+ candidatedata[2];
       let compareDate = new Date(candidatedate);
        if(compareDate <= twoYearsAgo)
        return candidate;
  });
  this.candidateData = experienceData;  
 }
  
  countByDept(){
    this.showDept = true;
    let deptCountData =this.candidate_data;
    let countDept;
    let obj = {}
    deptCountData.map(data => {
        if (data.department in obj) {

          obj[data.department] += 1;
        }
        else {
          obj[data.department] = 1;
        }
    });
    countDept = obj;  
    let keys = Object.keys(countDept);
    keys.forEach(key => {
      let obj = {
          "department":key,
          "count":countDept[key]
      }
      this.deptData.push(obj);
    });
     
  }
  removeDevelopment(){
    this.showDept = false;
    let removedData = this.candidate_data.filter(candidate => candidate.department !== "Development");
    this.candidateData = removedData;
  }

}
