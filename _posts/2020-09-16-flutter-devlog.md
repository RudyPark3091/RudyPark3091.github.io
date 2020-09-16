---
title: "flutter-devlog"
date: 2020-09-16 19:26
categories: flutter
---
### Flutter 개발환경 세팅하기  
 flutter는 구글의 크로스플랫폼 모바일 애플리케이션 개발 프레임워크다. 
지금까지 공부한 웹 개발 지식을 기반으로 React Native를 공부해볼까 하다 어차피 나중엔 다 공부하게 될거니 flutter 먼저 공부해보기로 했다.  
 flutter 는 IntelliJ, Android Studio, VS Code 세 가지 에디터에서 개발할 수 있는것으로 보인다. 
나의 경우엔 Android Studio를 설치해두고 아무것도 하지 않고 있어서 이번 기회에 사용해보기로 했다.  
 먼저 다운받은 flutter 폴더에서 flutter console을 실행하고 flutter doctor 명령어를 입력해보면 현재 내 환경에서 필요한 설정들이 무엇인지 알려준다. 
여기서 Android toolchain 을 업데이트하라는데 어디서 하는지 몰라서 꽤 애를 먹었다.  
 Android Studio 툴바의 Tools에서 SDK 매니저와 AVD 매니저는 앞으로도 많이 사용할 것 같으니 알아둬야겠다. 
여튼, [이 페이지]에서 시키는대로 Android Emulator를 키고 Run을 눌렀더니 이상없이 잘 동작하는것을 확인했다. 
flutter는 Hot Reload를 지원해 편안하게 개발할 수 있을 것 같다. flutter는 또한 Dart 언어로 작성되어있으니, 차차 이에 대해서도 공부해야되겠다.  
 
 [이 페이지]: https://flutter-ko.dev/docs/get-started/test-drive?tab=androidstudio#create-app
