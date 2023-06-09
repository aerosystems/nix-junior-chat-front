<template>
    <div v-if="showProfileState" class="profile-info">
        <div class="row">
            <div class="col-12 text-center">
                <div class="profile-image">
                    <form @submit.prevent="uploadImage">
                        <input type="file"
                               name="file"
                               class="hide"
                               id="profile-image-input"
                               @change="onFileSelected">
                        <label for="profile-image-input">
                            <img :src="userState.image"
                                 class="rounded-circle"
                                 alt="avatar"
                            >
                        </label>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <div class="profile-username">
                    <div class="input-wrapper">
                        <input type="text"
                               class="form-control"
                               :placeholder="userState.username"
                               v-model="username"/>
                        <button @click="updateUsername"
                                class="btn btn-outline-secondary">
                            <font-awesome-icon icon="pen"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="error-message" :class="{'show' : errorMessage}">
                    <div class="input-wrapper">
                        {{ errorMessage }}
                    </div>
                </div>
                <div class="success-message" :class="{'show' : successMessage}">
                    <div class="input-wrapper">
                        {{ successMessage }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "ProfileComponent",
    data() {
        return {
            username: "",
            showUsernameEditIcon: false,
            errorMessage: "",
            successMessage: "",
            file: null,
        }
    },
    computed: {
        ...mapState({
            showProfileState: state => state.ui.showProfile,
            userState: state => state.user.user,
        }),
    },
    methods: {
        async updateUsername() {
            try {
                await this.$store.dispatch("user/updateUsername", this.username);
                this.successResponse("Username updated successfully");
            } catch (error) {
                this.errorResponse(error.response.data.message);
            }
        },
        // вибір файлу для відправки
        onFileSelected(event) {
            this.file = event.target.files[0]
        },
        // відправка форми на сервер
        async uploadImage() {
            const formData = new FormData()
            formData.append('image', this.file)
            try {
                await this.$store.dispatch('user/uploadImage', formData);
                this.successResponse("Image updated successfully");
            } catch (error) {
                this.errorResponse(error);
            }
        },
        successResponse(message) {
            this.successMessage = message;
            setTimeout(() => {
                this.successMessage = '';
                this.errorMessage = '';
            }, 3000);
        },
        errorResponse(message) {
            this.errorMessage = message;
            setTimeout(() => {
                this.successMessage = '';
                this.errorMessage = '';
            }, 3000);
        }
    },
    watch: {
        file() {
            this.uploadImage()
        }
    }
}
</script>

<style scoped>
.profile-info {
    text-align: center;
    margin-top: 20px;
}

.profile-info img {
    width: 200px;
    height: 200px;
}

.profile-username {
    font-size: 20px;
    margin-top: 10px;
}

.profile-username input {
    width: 150px;
    margin: 0 5px;
}

.input-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-image {
    position: relative; /* встановлюємо позицію relative для контейнера зображення */
    display: inline-block; /* встановлюємо властивість inline-block для контейнера зображення */
}

.profile-image img {
    cursor: pointer;
}

.profile-image::before {
    font-size: 20px;
    content: "change image"; /* встановлюємо текст, який буде відображатись при наведенні */
    display: none; /* по замовчуванню псевдоелемент повинен бути прихований */
    position: absolute; /* встановлюємо позицію absolute для псевдоелемента */
    top: 90%; /* розташовуємо псевдоелемент по центру по вертикалі */
    left: 0; /* розташовуємо псевдоелемент зліва від контейнера зображення */
    transform: translate(0, -50%); /* зміщуємо псевдоелемент вгору на половину висоти */
    padding: 5px; /* додаємо невеликий відступ для тексту */
    background-color: white; /* встановлюємо білий фон */
    border-radius: 5px; /* встановлюємо круглі кути */
}

.profile-image:hover::before {
    display: block; /* при наведенні на контейнер зображення, псевдоелемент буде відображатись */
    z-index: 1; /* встановлюємо z-index, щоб псевдоелемент був поверх зображення */
    width: 100%; /* розтягуємо псевдоелемент на весь контейнер зображення */
    text-align: center; /* вирівнюємо текст по центру */
}

.hide {
    display: none;
}

.input-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-message {
    color: rgba(255, 0, 0, 0.65);
    margin-top: 10px;
    opacity: 0; /* початкова прозорість */
    transition: opacity 1s ease-in-out; /* плавна анімація зміни прозорості */
}

.error-message.show {
    opacity: 1; /* повна прозорість при показі повідомлення про помилку */
}

.success-message {
    color: rgb(72, 165, 46);
    margin-top: 10px;
    opacity: 0; /* початкова прозорість */
    transition: opacity 1s ease-in-out; /* плавна анімація зміни прозорості */
}

.success-message.show {
    opacity: 1; /* повна прозорість при показі повідомлення про помилку */
}

</style>