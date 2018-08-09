import {Component, OnInit} from "@angular/core";
import {AcademyAssistantService} from "../academy-assistant.service";
import {Message} from "primeng/components/common/api";
import {AlertService} from "../../../services/alert.service";
import {LoadingService} from "../../../services/loading.service";

@Component({
    selector: "app-import-course",
    templateUrl: "./import-course.component.html",
    styleUrls: ["./import-course.component.css"]
})
export class ImportCourseComponent implements OnInit {
    selectedGrade: any;
    selectedCourse: any;
    allGrades: any[];
    displayDialog: boolean = false;
    displayFile: boolean = false;
    dataResponseImportFile: any[];
    isImport: boolean;
    msgs: Message[] = [];
    nameFileImport: any;
    sumCourses: number;
    allCourses = [];
    gradeOptions: any[];
    allHK: any[];
    HkOptions: any[];
    showFileWord: boolean = false;
    downloadFileWord: boolean = false;
    url: any;
    allowDownload: boolean = false;

    constructor(private assistantService: AcademyAssistantService,
                private alertService: AlertService,
                private loading: LoadingService) {
    }

    ngOnInit() {
        this.loadData();
        this.getAllGrades();
    }

    showDialogFile() {
        this.displayFile = true;
    }

    myUploader(event) {
        this.loading.start();
        let object = {
            File: event.files[0],
            GradeId: this.selectedGrade.Id
        };
        this.assistantService
            .postCourse(object)
            .then(res => {
                console.log(res);
                this.dataResponseImportFile = res["Students"] as any;
                this.sumCourses = res["SumCourses"] as any;
                if (res["ErrorCouses"] > 0) {
                    this.isImport = false;
                    let str;
                    res["Students"].map(x => {
                        if (x.Error) {
                            str = `Khoá học ${x.Name} có lỗi : ${x.Error}`;
                            this.msgs.push({
                                severity: "error",
                                summary: "LỖI : ",
                                detail: str
                            });
                        }
                    });
                } else {
                    this.isImport = true;
                    this.nameFileImport = res["File"];

                }
                this.loading.stop();
            })
            .catch(err => {
                console.log(err);
                this.alertService.error(
                    err.message + " Vui lòng chọn lại file"
                );
                this.loading.stop();
            });
        this.msgs = [];
    }

    importFile() {
        let object = {
            name: this.nameFileImport,
            GradeId: this.selectedGrade.Id
        };
        this.assistantService
            .importCourse(object)
            .then(res => {
                this.alertService.success("Thêm thành công");
                this.cancelImport();
                this.loadData();
            })
            .catch(err => {
                console.log(err);
            });
    }

    cancelImport() {
        this.dataResponseImportFile = null;
    }

    loadData() {
        this.loading.start();
        this.assistantService
            .getAllCourses()
            .then(res => {
                this.allCourses = res as any;
                console.log(this.allCourses);
                let totalTongTiet = 0;
                this.allCourses.map(x => (totalTongTiet += x.TongTiet));
                let HK = this.allCourses.map(x => x.HK);

                this.allHK = HK.filter(
                    (value, index, array) => array.indexOf(value) == index
                );
                console.log(this.allHK);
                this.HkOptions = this.allHK.map(x => {
                    return {
                        label: x.toString(),
                        value: x.toString()
                    };
                });
                this.HkOptions.unshift({
                    label: "",
                    value: ""
                });
                console.log(this.HkOptions);
                this.HkOptions.sort(function (a, b) {
                    return (+a.value) - (+b.value);
                })
                this.loading.stop();
            })
            .catch(err => {
                console.log(err);
                this.loading.stop();
            });
    }

    selectCourse(event: Event, course: any) {
        this.selectedCourse = course;
        this.displayDialog = true;
        event.preventDefault();
    }

    deleteCourse(course) {
        this.loading.start();
        this.alertService
            .confirm("Bạn có chắc muốn xoá !!!")
            .then(res => {
                this.assistantService
                    .deleteCourse(course.Id)
                    .then(res => {
                        this.alertService.success(res["message"]);
                        this.loadData();
                    })
                    .catch(err => this.alertService.error(err));
                this.loading.stop();
            })
            .catch(err => {
                this.alertService.error(err);
                this.loading.stop();
            });
    }

    getAllGrades() {
        this.assistantService
            .getListGrades()
            .then((res: any[]) => {
                this.allGrades = res;
                console.log("all grades ", this.allGrades);
                this.gradeOptions = this.allGrades.map(x => {
                    return {
                        label: x.Name,
                        value: x.Name
                    };
                });
                this.gradeOptions.unshift({
                    label: "",
                    value: ""
                });
                console.log(this.gradeOptions);
            })
            .catch(err => this.alertService.error(err["message"]));
    }

    onChange(value) {
        console.log(value);
        this.selectedGrade = value;
    }

    uploadFileWord(event) {
        let object = {File: event.files[0], grade_id: this.selectedGrade.Id};
        console.log(object);
        this.assistantService
            .uploadFileWord(object)
            .then(res => {
                this.alertService.success(res["message"]);
            })
            .catch(err => {
                console.log(err["message"]);
            });
    }

    DownloadWord() {
        this.assistantService
            .downloadFileWord(this.selectedGrade.Id)
            .then(res => {
                console.log(res);
                this.url = res["url"];
                this.allowDownload = true;
            })
            .catch(err => console.log(err));
    }
}
