---
layout: post
title: "[Python] Virtualenv"
date: 2023-03-14 09:00:00 +09:00
categories: [Python, venv, virtualenv]
tags: [Python]
comments: true
---

> **Imagine you have two applications, App1 and App2. Both use the package Pak, but require different versions. If you install Pak version 2.3 for App1, you would not be able to run App2 because it requires version 3.1**
>
[https://www.freecodecamp.org/news/python-virtual-environments-explained-with-examples/](https://www.freecodecamp.org/news/python-virtual-environments-explained-with-examples/)

해석하면

App1 과 App2 두 개의 application을 가지고 있다고 상상해 보십시오, 둘다 Pak(?) 패키지를 사용하지만, 다른 버전이 필요합니다. 만약 App1용 Pak 버전 2.3을 설치하면 3.1 버전이 필요하기에 App2를 실행할 수 없습니다.

## 왜 애플리케이션별로 독립된 가상환경이 필요한지

하나의 PC 또는 서버 환경에서 application은 버전 1의 패키지(library)를 필요로 하고, 

다른 application은 버전 2의 패키지(library)를 필요로 하면, 관리를 어떻게 할까 ?

혹은, 이상없는 특정 application의 환경을 그대로 유지하고 싶은 경우, 라이브러리 버전이 변경 된다면 그 동안 이상없던 프로그램에서 장애를 일으킬 수 있다.

<figure align="center">
  <img src="https://miro.medium.com/max/720/1*Uw9xyn1G2qOMsA_tF40g7g.png">
  <figcaption>
    <p style="color: var(--blockquote-text-color);">
      한 서버 안에 여러 Virtualenv 환경 설정을 통해 각각 독립된 버전 관리를 가능하게 해준다.
    </p>
  </figcaption>
</figure>

Virtualenv를 사용하면 두 케이스 모두 케어가 된다.

하나의 PC 또는 서버 안에서 virtualenv를 설정하고 그 환경 안에서는 Host 환경과 별도로 각각 필요한 Python 버전을 관리하고, 필요한 특정 버전의 라이브러리 또한 관리할 수 있게 해준다.

## virtualenv와 venv 비교

*virtualenv → [https://github.com/pypa/virtualenv/blob/main/docs/index.rst](https://virtualenv.pypa.io/en/latest/index.html)* 

위 링크에 의하면 

> **venv는 virtualenv의 일부분을 가져와서 만든 모듈이기에 venv는 virtualenv의 모든 기능을 포함하지 않는다.**
> 

라고 명시 되어 있다.

## virtualenv와 venv 둘 사이에서 venv의 단점

- is slower (by not having the `app-data` seed method)
    
    → 느리다.
    
- is not as extendable,
    
    → 확장성이 떨어진다.
    
- cannot create virtual environments for arbitrarily installed python versions (and automatically discover these),
    
    → 임시로 설치된 python 버전에 대해서 가상환경을 만들 수 없다. 
    
    (요약 → venv에서는 python 버전을 다르게 해서 가상환경을 만들 수 없다)
    
- is not upgrade-able via [pip](https://pip.pypa.io/en/stable/getting-started/),
    
    → pip를 통한 업그레이드가 안된다.
    
- does not have as rich programmatic API (describe virtual environments without creating them).
    
    풍부한 프로그래밍 API를 보유하지 않음 (가상환경을 생성하지 않고 설명)

## 1️⃣ virtualenv 설치 (Windows)

```powershell
python -m pip install --upgrade pip
python -m pip install virtualenv

# 설치 확인용
virtualenv --version
```

## 2️⃣ virtaulenv 생성

```powershell
# 현재 디렉토리에 'venv" 이름으로 생성 (이름은 자유)
virtualenv venv

# 가상환경의 python 버전 명시도 가능 
# argument는 --python=/버전 별 파이썬 설치 경로/python3, python2.7 가상환경 폴더 이름
virtualenv --python="python 경로" venv
```

## 3️⃣ virtualenv 활성화

```powershell
.\venv\Scripts\activate

# 실행 후 (venv) ~~ 나오면 활성화 성공
(venv) ~~ : 
```

## 4️⃣ 가상환경 내부에 패키지 설치

```powershell
# 단독 설치
(venv) ~~: pip install "패키지명"

# .txt로 한번에 설치
(venv) ~~: pip install -r "txt파일".txt
```

## 5️⃣ virtualenv 비활성화

```powershell
deactivate
```
