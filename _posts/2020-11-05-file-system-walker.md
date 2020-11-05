---
title: "File System Walker"
date: 2020-11-05 22:16:28
categories: system
---
## File System Walker
 우리는 컴퓨터를 사용하며 파일을 읽고 실행하기 등의 작업을 하기 위해 파일 탐색기를 사용한다. 만약 어떤 실행 프로그램이 있다고 할 때 우리는 탐색기를 실행하고 그 프로그램이 존재하는 곳으로 이동하여 아이콘을 더블클릭해 실행한다. 이와 비슷하게, 파일 시스템을 재귀적으로 방문하고 탐색하는 프로그램을 File System Walker라고 한다. 이는 특히 cli 환경에서 유용하게 쓰일 수 있는데, 프로그래밍 언어 별로 다양한 방법으로 구현할 수 있다.   
   
## C언어로 구현한 Walker
``` c
#include <unistd.h>
#include <sys/types.h>
#include <dirent.h>
#include <stdio.h>
#include <string.h>

void listdir(const char *name, int indent)
{
    DIR *dir;
    struct dirent *entry;

    if (!(dir = opendir(name)))
        return;

    while ((entry = readdir(dir)) != NULL) {
        if (entry->d_type == DT_DIR) {
            char path[1024];
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0)
                continue;
            snprintf(path, sizeof(path), "%s/%s", name, entry->d_name);
            printf("%*s[%s]\n", indent, "", entry->d_name);
            listdir(path, indent + 2);
        } else {
            printf("%*s- %s\n", indent, "", entry->d_name);
        }
    }
    closedir(dir);
}

int main(void) {
    listdir(".", 0);
    return 0;
}
```
출처: [Stack Overflow]   
헤더파일 dirent.h 에 정의된 내용을 바탕으로 디렉토리의 내용을 읽어오는 함수 readdir()로 dirent 구조체 entry를 초기화해가며 타입이 디렉토리인경우 재귀적으로 함수를 호출하고, 파일인 경우 화면에 파일의 이름을 출력하는 예제이다.   

[Stack Overflow]: https://stackoverflow.com/questions/8436841/how-to-recursively-list-directories-in-c-on-linux/8438663#8438663?newreg=37be0fe7c10b4b5ea49b35433d8ed44e
