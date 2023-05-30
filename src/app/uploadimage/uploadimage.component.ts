import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { Model } from './imgmodel';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css'],
})
export class UploadimageComponent {
  modelik: Model = new Model();
  selectedImage: any;

  constructor(
    private authServ: AuthService,
    private alertServ: AlertifyService
  ) {}

  readUrl(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedImage = selectedFile;
    this.modelik.image = selectedFile;
    console.log(
      'Cevap:',
      this.selectedImage,
      'cevap of image',
      this.modelik.image
    );
  }

  changeimg(uploadForm: NgForm) {
    const loggedUser = localStorage.getItem('loggedUser');

    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      const fileInput = document.getElementById('image') as HTMLInputElement;

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        let file = fileInput.files[0];
        console.log('file of path:', file);
        file = this.modelik.image;
        const formData = new FormData();
        formData.append('image', file, file.name); // Use "image" as the field name

        this.authServ.editPhoto(userData._id, formData).subscribe(
          (data) => {
            console.log('data of img:', data);
            // Handle the response data based on success or failure
            if (data.success) {
              const data2 = localStorage.getItem('loggedUser');
              const userData = JSON.parse(data2);
              userData.profile_image = data.user.profile_image;
              localStorage.setItem('loggedUser', JSON.stringify(userData));
              this.alertServ.success(
                'profil resmi başarılı bir şekilde güncellendi:)'
              );
            } else {
              this.alertServ.danger("hata:"+data.message);
            }
          },
          (err) => {
            console.log('Error:', err.message);

            this.alertServ.danger("hata:"+err.message);
          }
        );
      }
    }
  }
}
