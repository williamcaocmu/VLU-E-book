import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AlertService } from "../../../services/alert.service";
import { AcademyAssistantService } from "../academy-assistant.service";
import { RequestOptions, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-class-management",
  templateUrl: "./class-management.component.html",
  styleUrls: ["./class-management.component.css"]
})
export class ClassManagementComponent implements OnInit {
  
  allStudents: any;
  filesToUpload: Array<File>;

  uploadedFiles: {
    File: "";
  };
  selectedStudent: any;
  displayDialog: boolean;
  items: MenuItem[] = [{ label: "Quản lí sinh viên" }];

  allTimeSheetData = [{ project: "a" }, { project: "b" }, { project: "c" }];
  allProjectNames1 = ["", "a", "b", "c"];
  allProjectNames2 = ["", "m", "n", "p"];

  allProjects1 = this.allProjectNames1.map(proj => {
    return { label: proj, value: proj };
  });

  allProjects2 = this.allProjectNames2.map(proj => {
    return { label: proj, value: proj };
  });

  constructor(
    private alertService: AlertService,
    private assistantService: AcademyAssistantService,
    private http: Http,
    private api: ApiService
  ) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.assistantService
      .getList()
      .then(res => {
        console.log(res);
        this.allStudents = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  selectStudent(event: Event, student: any) {
    this.selectedStudent = student;
    this.displayDialog = true;
    event.preventDefault();
    console.log(student, " - ", event);
  }

  myUploader(event) {
    console.log("ahihi do nghoc", event.files);
    this.assistantService
      .postFile(event.files)
      .then(res => {
        console.log("success");
      })
      .catch(err => console.log(err));
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      console.log(fileList);
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("uploadFile", file);
      let headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer " +
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC92bHVlYm9vay54eXpcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MjczNDc3MDMsImV4cCI6MTUyODY0MzcwMywibmJmIjoxNTI3MzQ3NzAzLCJqdGkiOiJ6RU1udjh5OUpYRVY5aXcxIiwic3ViIjoyLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.QL_RDw8xf521zbYfs6JoOwrvB9SMoCaD1H5aqWzM8mk"
      );
      console.log(this.api.access_token);
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      this.http
        .post(
          "http://vluebook.xyz/api/assistant/handleFile",
          { File: formData },
          { headers: headers as any }
        )
        .map(res => res.json)
        .catch(err => Observable.throw(err))
        .subscribe(data => console.log("success"), err => console.log(err));
    }
  }
  // cai choose ở dưới là của thằng fileUpload cũng ra not exist path , thằng p-fileUpload là thư viện,
  // thằng này tự viết đm lag vl đéo làm nữa, t2 đi , ok
  fileUpload(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      console.log(event.target.files, event);
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("photo", file, file.name);
      console.log("data: ", formData.get("photo"));
      this.assistantService
        .postFile(file)
        .then(res => console.log("a"))
        .catch(err => console.log(err));
    }
  }
}
