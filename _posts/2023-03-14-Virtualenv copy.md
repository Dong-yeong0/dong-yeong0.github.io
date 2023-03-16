---
layout: post
title: "[Docker] Container 🐋"
date: 2023-03-16 12:41:00 +09:00
categories: [docker]
tags: [docker]
comments: true
---

## Container
![Untitled](https://geeksterminal.com/wp-content/uploads/2019/11/docker-logo-310x162.png)

Container는 가상화 기술 중 하나로 대표적으로 Linux Container가 있다. 기존 OS를 가상화 시키던 것과 달리 **Container는 OS레벨의 가상화로 프로세스를 격리시켜 동작하는 방식이다.**

## VM  vs Docker

![Untitled](https://blog.kakaocdn.net/dn/JloLY/btq7WUSbsmn/uVtXFK1zOz2FRKuFNNJdQk/img.jpg){: width="100%"}

VM은 Host OS 위에 가상화를 시키기 위한 **Hypervisor**엔진을 이용하여 여러 개의 OS를 하나의 호스트에서 생성하여 사용하는 방식으로 **가상화된 하드웨어 위에 OS가 올라가는 형태로 거의 완벽하게 Host와 분리된다.**

반면, 컨테이너 기반 가상화는 Docker 엔진 위에 Application 실행에 필요한 Binary만 올라간다.
Hypervisor를 이용한 가상화를 보면 Host OS와 완전히 분리되는 장점은 있지만 OS위에 OS를 올리기 때문에 무겁고 느릴수 밖에 없는 구조다.

컨테이너 기반 가상화는 Host OS 그리고 Docker 엔진위에서 바로 동작하며 Host OS와 커널을 공유하며 커널을 공유하게 되면 **I/O(input/output)처리가 쉽게 되어 성능의 효율을 높일 수 있다**.
그리고 하나의 서버에 여러 개의 컨테이너를 실행하면 서로 영향을 미치지 않고 독립적으로 실행할 수 있다.

간략히,
컨테이너를 사용하는 것은 가상머신을 생성하는 것이 아니라 Host OS가 사용하는 자원을 분리하여 여러 환경을 만들 수 있도록 하는 것이다.
