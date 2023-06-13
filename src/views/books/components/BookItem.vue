<script setup lang="ts">
import BookService from '../service'
import ShopCartOperation from './ShopCartOperation.vue'
import getImg from '@/utils/imgUtil'

const { searchBooks, bookStoreRefs } = BookService
const { getBookList } = bookStoreRefs

searchBooks()
</script>

<template>
  <div class="content">
    <div v-for="bookItem in getBookList" :key="bookItem.ISBN" class="book-item">
      <img class="bookpic" :src="getImg(bookItem.bookpicname)" alt="book image">
      <div class="bookinfo">
        <div class="bookinfo-brief">
          <div class="book-name">
            {{ bookItem.bookname }}
          </div>
          <div class="book-author-publs">
            <span class="author spacing">{{ bookItem.author }}</span>
            <span class="separator spacing">|</span>
            <span class="publs spacing">{{ bookItem.publishername }}</span>
          </div>
        </div>
        <div class="bookinfo-other">
          <div class="price">
            <span class="discountprice spacing">
              <span class="symbol">&yen;</span>
              {{ bookItem.discountprice }}
            </span>
            <span class="originprice spacing">&yen;{{ bookItem.originalprice }}</span>
            <span class="discount">{{ bookItem.discount }}折</span>
          </div>
          <div class="give">
            <span class="self-support">自营</span>
            <span class="coupons">券</span>
            <span class="free-shipping">包邮</span>
          </div>
          <div class="monthsalescount">
            <span>月售{{ bookItem.monthsalecount }}</span>
          </div>
          <div class="ranklist">
            <span>图书畅销总排行榜第1名</span>
          </div>
        </div>
        <ShopCartOperation :book-item="bookItem" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: grid;
  margin-top: 0.18rem;
  row-gap: 0.12rem;
}

.book-item {
  display: grid;
  grid-template-columns: 2.3rem 2.7rem;
  grid-auto-flow: row;
  height: 4.3rem;
  justify-items: center;
  grid-auto-rows: min-content;

  .bookpic {
    width: 1.8rem;
    height: 2.2rem;
    align-self: center;
    object-fit: contain;
  }

  .bookinfo {
    display: grid;
    width: 2.7rem;
    grid-template-columns: 2.7rem;
    grid-auto-flow: row;
    row-gap: 0.2rem;

    &-brief {
      width: 100%;
      line-height: 0.35rem;

      .book-name {
        font-size: 0.25rem;
        color: #4c4c4c
      }

      .book-author-publs {
        color: #848484;

        .spacing {
          margin-right: 0.1rem;
        }
      }
    }

    &-other {
      line-height: 0.36rem;

      .price {
        .spacing {
          margin-right: 0.1rem;
        }

        .discountprice {
          font-size: 0.27rem;
          color: #e94039;

          .symbol {
            font-size: 0.22rem
          }
        }

        .originprice,
        .discount {
          color: #c6c6c6;
          font-size: 0.2rem;
        }

        .originprice {
          text-decoration: line-through;
        }
      }

      .give {
        display: flex;
        line-height: 0.2rem;
        justify-content: flex-start;
        gap: 0.05rem;
        font-size: 0.15rem;

        .self-support {
          padding: 0 0.15rem;
          border-radius: 0.05rem;
          text-shadow: 0 0.005rem #7f7f7f;
          background-color: #eb636d;
          color: white;
        }

        .coupons {
          padding: 0 0.15rem;
          border-radius: 0.05rem;
          border: 1px #d06d70 solid;
          background-color: white;
          color: #7f7f7f;
          text-shadow: 0 0.005rem #d06d70;
        }

        .free-shipping {
          padding: 0 0.15rem;
          border-radius: 0.05rem;
          border: 1px #d06d70 solid;
          background-color: white;
          color: #7f7f7f;
          text-shadow: 0 0.005rem #d06d70;
        }
      }

      .monthsalescount,
      .ranklist {
        color: #db8441;
        font-size: 0.2rem;
        padding: 0.04rem;
      }

      .ranklist {
        background-color: #fef3ed;
        width: 2.5rem;
        text-indent: 0.04rem;
      }
    }
  }

}

.content:last-child {
  margin-bottom: 0.73rem;
}
</style>
