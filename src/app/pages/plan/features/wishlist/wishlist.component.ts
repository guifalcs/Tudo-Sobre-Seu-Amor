import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { WishlistService } from '../../../../services/wishlist.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishes = signal<any>([])
  isAddWishModalOpen = false;
  currentWish: any = {
    title: '',
    link: ''
  };
  currentUser = signal<any>({})
  subscription: any = ''

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      if (user?.user.wishlist) {
        this.wishes.set(user.user.wishlist)
        this.currentUser.set(user.user)
      }
    });
  }

  openAddWishModal() {
    this.currentWish = { title: '', link: '' };
    this.isAddWishModalOpen = true;
  }

  closeWishModal() {
    this.isAddWishModalOpen = false;
    this.currentWish = { title: '', link: '' };
  }

  addWish() {
    if (!this.currentWish.title || !this.currentWish.link) return alert("Preencha todos os campos corretamente")

      this.authService.currentUser$.subscribe(user => {
        if (user?.user.id) {
          this.wishlistService.addWish({
            userId: user.user.id,
            title: this.currentWish.title!,
            link: this.currentWish.link!
          }).subscribe({
            next: (wish) => {
              this.wishes.update((wishes) => [...wishes, wish])
              this.closeWishModal()
            },
            error: () => alert("Erro ao adicionar desejo"),
            complete: () => {}
          });
        }
      }).unsubscribe();
  }

  deleteWish(id: string) {
    if(window.confirm("Deseja excluir o seu desejo?")){
      this.wishlistService.deleteWish(id).subscribe({
      next: () => {
        const updatedWishes = this.wishes().filter((wish: any) => wish.id !== id);
        this.wishes.set(updatedWishes)
      },
      error: (err) => alert("Erro ao deletar desejo"),
      complete: () => {}
    })}
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
