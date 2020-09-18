---
title: "flutter-devlog"
date: 2020-09-16 19:26
categories: flutter
---
## Flutter 개발환경 세팅하기  
  flutter는 구글의 크로스플랫폼 모바일 애플리케이션 개발 프레임워크다. 
지금까지 공부한 웹 개발 지식을 기반으로 React Native를 공부해볼까 하다 어차피 나중엔 다 공부하게 될거니 flutter 먼저 공부해보기로 했다.  
  flutter 는 IntelliJ, Android Studio, VS Code 세 가지 에디터에서 개발할 수 있는것으로 보인다. 
나의 경우엔 Android Studio를 설치해두고 아무것도 하지 않고 있어서 이번 기회에 사용해보기로 했다.  
 먼저 다운받은 flutter 폴더에서 flutter console을 실행하고 flutter doctor 명령어를 입력해보면 현재 내 환경에서 필요한 설정들이 무엇인지 알려준다. 
여기서 Android toolchain 을 업데이트하라는데 어디서 하는지 몰라서 꽤 애를 먹었다.  
  Android Studio 툴바의 Tools에서 SDK 매니저와 AVD 매니저는 앞으로도 많이 사용할 것 같으니 알아둬야겠다. 
여튼, [이 페이지]에서 시키는대로 Android Emulator를 키고 Run을 눌렀더니 이상없이 잘 동작하는것을 확인했다. 
flutter는 Hot Reload를 지원해 편안하게 개발할 수 있을 것 같다. flutter는 또한 Dart 언어로 작성되어있으니, 차차 이에 대해서도 공부해야겠다.  
   
   
## Dart 문법 기초
  flutter기반 애플리케이션은 역시 구글이 개발한 Dart라는 언어로 작성한다. 이는 자바스크립트를 대체할 목적으로 만들어졌지만 아직은 달성하지 못한 것으로 보인다. 
지금까지 flutter 애플리케이션을 작성해본 바로는, Dart는 객체지향적이며 명시적 타입 선언을 지원해 타입스크립트가 아닌 자바스크립트보다 안정적인 느낌을 받을 수 있었다.   
   
  Dart의 간단한 문법은 다음과 같다.
* 변수 타입은 var 키워드로 선언한다.
``` dart
var name = 'Voyager I';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
var image = {
  'tags': ['saturn'],
  'url': '//path/to/saturn.jpg'
};
```
위 소스에서 볼 수 있듯 자바스크립트와 비슷한 형태의 변수선언을 가진다.  
 * 파이썬에서의 for처럼 사용할 수 있다.
``` dart
for (int month = 1; month <= 12; month++) {
  print(month);
}
```
 * 명시적 타입 선언을 지원한다.
``` dart
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

var result = fibonacci(20);
```
 * 식별자 앞에 언더스코어를 붙이면 private 선언과 동일한 효과를 낸다.
``` dart
class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _biggerFont = const TextStyle(fontSize: 18.0);
  // ···
}
```
* 클래스 선언시 멤버변수에 this 키워드를 붙여 간단하게 생성자를 선언할 수 있다.
``` dart
class Student {
  String name;
  int grade;
  
  Student(this.name, this.grade);
}
```
물론 자바에서 하던것처럼 이런 생성자도 선언할 수 있다.
``` dart
class Student {
  String name;
  int grade;
  
  Student(String name, int grade) {
    this.name = name;
    this.grade = grade;
  }
}
```

  
  
reference:  
https://dart.dev/samples
 
 [이 페이지]: https://flutter-ko.dev/docs/get-started/test-drive?tab=androidstudio#create-app
