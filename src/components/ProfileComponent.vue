<template>
    <div v-if="showProfileState" class="profile-info">

        <div class="profile-image">
            <input type="file"
                   name="file"
                   id="image-upload"
                   ref="profileImageInput"
                   class="hide"
                   @change="uploadProfileImage">
            <label for="image-upload">
                <img :src="userState.image"
                     @click="chooseProfileImage"
                     class="rounded-circle"
                     alt="avatar"
                >
            </label>
        </div>

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
        <div class="error-message" :class="{'show' : errorMessage}">
            <div class="input-wrapper">
                {{ errorMessage }}
            </div>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
import { ref } from 'vue'

export default {
    name: "ProfileComponent",
    setup() {
        const profileImageInput = ref(null);

        function chooseProfileImage() {
            profileImageInput.value.click();
        }

        async function uploadProfileImage() {
            const file = profileImageInput.value.files[0];
            const formData = new FormData();
            formData.append('image', file);
            try {
                await this.$store.dispatch('user/uploadImage', formData);
            } catch (error) {
                this.errorMessage = error.response.data.message;
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            }
        }

        return {
            profileImageInput,
            chooseProfileImage,
            uploadProfileImage
        };
    },
    data() {
        return {
            username: "",
            showUsernameEditIcon: false,
            errorMessage: "",
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
            } catch (error) {
                this.errorMessage = error.response.data.message;
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            }
        },
    },
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
    margin-top: 20px;
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

.error-message {
    color: rgba(255, 0, 0, 0.65);
    margin-top: 10px;
    opacity: 0; /* початкова прозорість */
    transition: opacity 1s ease-in-out; /* плавна анімація зміни прозорості */
}

.error-message.show {
    opacity: 1; /* повна прозорість при показі повідомлення про помилку */
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

</style>