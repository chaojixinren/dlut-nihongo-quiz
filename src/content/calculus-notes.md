# 微积分2 · 核心笔记（第 1–18 课）

> 本手册按课次整理《微积分2》18 讲的核心笔记，覆盖定义、公式、例题、做题步骤与易错点。
> 左侧目录按课次/知识点跳转，主体完整展开方便滚动阅读；每课末尾的「GPT 补充」折叠面板收纳 ChatGPT 后续指出的缺漏与满分版建议。

---

## 第 1 课 · 级数

### 1. 级数收敛的必要条件

若级数 $\sum_{n=1}^{\infty}u_n$收敛，则必有 $\lim_{n\to\infty}u_n=0$。

因此，若 $\lim_{n\to\infty}u_n\ne 0$（或极限不存在），则级数一定发散。

**注意**：$\lim_{n\to\infty}u_n=0$只是级数收敛的**必要条件**，不是充分条件。

反例：调和级数 $\sum_{n=1}^{\infty}\frac1n$，虽然 $\lim_{n\to\infty}\frac1n=0$，但它仍然发散。

### 2. 三类重要级数

#### 2.1 $p$-级数

$$\sum_{n=1}^{\infty}\frac1{n^p}$$

敛散性：

$$
\begin{cases}
p>1, & \text{收敛} \\
p\leq 1, & \text{发散}
\end{cases}
$$

特别地，$\sum_{n=1}^{\infty}\frac1n$称为**调和级数**，发散。

#### 2.2 几何级数（等比级数）

$$\sum_{n=0}^{\infty}aq^n$$

敛散性：

$$
\begin{cases}
|q|<1, & \text{收敛} \\
|q|\geq 1, & \text{发散}
\end{cases}
$$

若 $|q|<1$，则和为 $S=\dfrac{a}{1-q}$。

例：$\sum_{n=1}^{\infty}\frac{(-1)^n}{2^n}=\sum_{n=1}^{\infty}\left(-\frac12\right)^n$，公比 $q=-\frac12$，$|q|=\frac12<1$，所以收敛。

#### 2.3 对数 $p$-级数

$$\sum_{n=2}^{\infty}\frac1{n^\alpha(\ln n)^\beta}$$

注意一般从 $n=2$开始（因为 $\ln 1 = 0 $；。

先看 $\alpha$：

- $\alpha>1$⇒ 收敛
- $\alpha<1$⇒ 发散
- $\alpha=1$时再看 $\beta$：$\beta>1$收敛，$\beta\leq 1$发散

### 3. 收敛级数的基本性质

#### 3.1 乘常数不改变敛散性

若 $\sum u_n$收敛，则 $\sum cu_n$（$c\ne 0 $；也收敛。

#### 3.2 改变有限项不改变敛散性

级数的敛散性只由无穷远处的项决定。例如 $\sum_{n=1}^{\infty}u_n$与 $\sum_{n=100}^{\infty}u_n$敛散性相同。但改变有限项可能改变级数的**和**。

#### 3.3 两个级数相加

- 收 + 收 = 收
- 收 + 发 = 发
- 发 + 发：不一定（可能收敛也可能发散），不能随便判断

### 4. 正项级数敛散性

正项级数指 $u_n\geq 0$的级数 $\sum u_n$。

#### 4.1 比较判别法

设 $\sum u_n,\ \sum v_n$都是正项级数。若存在 $N$，当 $n>N$时 $0\leq u_n\leq v_n$，则：

- **大的收敛 ⇒ 小的一定收敛**：$\sum v_n$收敛 ⇒ $\sum u_n$收敛
- **小的发散 ⇒ 大的一定发散**：$\sum u_n$发散 ⇒ $\sum v_n$发散

#### 4.2 比较判别法的极限形式

设 $\sum u_n,\ \sum v_n$为正项级数，且 $\lim_{n\to\infty}\frac{u_n}{v_n}=d$：

| $d$的范围 | 结论 |
|---|---|
| $0<d<+\infty$| 二者同敛散 |
| $d=0$| $\sum v_n$收敛 ⇒ $\sum u_n$收敛 |
| $d=+\infty$| $\sum u_n$收敛 ⇒ $\sum v_n$收敛 |

### 5. 比值判别法

常用于含 $n!$、$a^n$、$n^n$等形式的级数。

设正项级数 $\sum u_n$满足 $\lim_{n\to\infty}\dfrac{u_{n+1}}{u_n}=\rho$：

$$
\begin{cases}
\rho<1, & \text{收敛} \\
\rho>1, & \text{发散} \\
\rho=1, & \text{失效，换其他方法}
\end{cases}
$$

### 6. 根值判别法

常用于含 $a^n$、$n^n$等复杂幂形式的级数。

设正项级数 $\sum u_n$满足 $\lim_{n\to\infty}\sqrt[n]{u_n}=\rho$：

$$
\begin{cases}
\rho<1, & \text{收敛} \\
\rho>1, & \text{发散} \\
\rho=1, & \text{失效，换其他方法}
\end{cases}
$$

### 7. 交错级数与莱布尼茨判别法

交错级数的一般形式为 $\sum_{n=1}^{\infty}(-1)^{n-1}u_n$，其中 $u_n>0$，符号表现为 $+\ -\ +\ -\ \cdots$。

**莱布尼茨判别法**：若交错级数 $\sum_{n=1}^{\infty}(-1)^{n-1}u_n$满足：

1. **单调递减**：$u_n\geq u_{n+1}$
2. **通项趋于零**：$\lim_{n\to\infty}u_n=0$

则该交错级数收敛。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 笔记中需要改得更严谨的地方

#### A.1 必要条件要补"极限不存在也发散"

完整写法：若 $\lim_{n\to\infty}u_n\ne 0$**或极限不存在**，则 $\sum u_n$发散。

例：$\sum_{n=1}^{\infty}(-1)^n$，通项极限不存在，所以发散。

#### A.2 "乘常数不改变敛散性"要注意 $c=0$

严格来说：若 $c\ne 0$，$\sum u_n$与 $\sum cu_n$同敛散；若 $c=0$，则 $\sum cu_n=\sum 0$必收敛。

#### A.3 比值与根值判别法最好写成"绝对值形式"

对于一般项级数（含 $(-1)^n$、$\sin n$等），用绝对值形式更通用：

比值：$\lim_{n\to\infty}\left|\dfrac{u_{n+1}}{u_n}\right|=\rho \Rightarrow \begin{cases}\rho<1, & \text{绝对收敛}\\ \rho>1, & \text{发散}\\ \rho=1, & \text{失效}\end{cases}$

根值：$\lim_{n\to\infty}\sqrt[n]{|u_n|}=\rho \Rightarrow \begin{cases}\rho<1, & \text{绝对收敛}\\ \rho>1, & \text{发散}\\ \rho=1, & \text{失效}\end{cases}$

#### A.4 极限比较判别法最常用情况

当 $u_n\sim v_n$（即 $\lim_{n\to\infty}\frac{u_n}{v_n}=1 $；时，二者同敛散。考试最常用。

### B. 必须补充的知识点

#### B.1 绝对收敛与条件收敛

对于一般项级数 $\sum u_n$：

- 若 $\sum |u_n|$收敛，则称 $\sum u_n$**绝对收敛**，且 $\sum |u_n|$收敛 ⇒ $\sum u_n$收敛
- 若 $\sum u_n$收敛但 $\sum |u_n|$发散，则称 $\sum u_n$**条件收敛**

经典例子：$\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n}$本身收敛（莱布尼茨），但 $\sum_{n=1}^{\infty}\frac1n$发散，所以是条件收敛。

#### B.2 积分判别法

若 $u_n=f(n)$，且 $f(x)$在 $[1,+\infty)$上正、连续、单调递减，则 $\sum_{n=1}^{\infty}u_n$与 $\int_1^{+\infty}f(x)\,dx$同敛散。

例：$\sum_{n=2}^{\infty}\frac1{n\ln n}$，对应 $\int_2^{+\infty}\frac1{x\ln x}\,dx$。令 $t=\ln x$，则 $=\int_{\ln 2}^{+\infty}\frac1t\,dt$发散，所以原级数发散。

（笔记里的对数 $p$-级数就是靠积分判别法来的）

#### B.3 等价无穷小判别

若 $u_n\sim v_n$且 $u_n,v_n>0$，则 $\sum u_n$与 $\sum v_n$同敛散。

常用等价：

| 等价式 | 备注 |
|---|---|
| $\sin\frac1n\sim \frac1n$| |
| $\ln\left(1+\frac1n\right)\sim \frac1n$| |
| $e^{1/n}-1\sim \frac1n$| |
| $1-\cos\frac1n\sim \frac1{2n^2}$| 注意分母是 $n^2$|

#### B.4 裂项相消求和

常考求和题。例：$\sum_{n=1}^{\infty}\frac1{n(n+1)}$，裂项 $\frac1{n(n+1)}=\frac1n-\frac1{n+1}$，所以和为 $1$。

再如：$\frac1{(2n-1)(2n+1)}=\frac12\left(\frac1{2n-1}-\frac1{2n+1}\right)$。

#### B.5 交错级数的误差估计

若 $\sum_{n=1}^{\infty}(-1)^{n-1}u_n$满足莱布尼茨条件，用前 $n$项和 $S_n$近似总和 $S$时：

$$|S-S_n|\leq u_{n+1}$$

即误差不超过下一项。

#### B.6 幂级数与收敛半径

幂级数一般形式 $\sum_{n=0}^{\infty}a_n(x-x_0)^n$，重点是求收敛半径 $R$和收敛区间。

收敛半径：$R=\lim_{n\to\infty}\left|\dfrac{a_n}{a_{n+1}}\right|$（极限存在时）

或通过比值判别法：$\lim_{n\to\infty}\left|\dfrac{a_{n+1}(x-x_0)^{n+1}}{a_n(x-x_0)^n}\right|<1$求 $x$的范围。

**端点必须单独代入判断**。例如求出 $|x-1|<2$⇒ $-1<x<3$，但 $x=-1$和 $x=3$要分别代入原级数判断敛散性。

#### B.7 泰勒级数与常用展开

| 函数 | 展开式 | 收敛域 |
|---|---|---|
| $e^x$| $\sum_{n=0}^{\infty}\frac{x^n}{n!}$| $(-\infty,+\infty)$|
| $\sin x$| $\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n+1}}{(2n+1)!}$| $(-\infty,+\infty)$|
| $\cos x$| $\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n}}{(2n)!}$| $(-\infty,+\infty)$|
| $\frac1{1-x}$| $\sum_{n=0}^{\infty}x^n$| $\|x\|<1$|
| $\ln(1+x)$| $\sum_{n=1}^{\infty}(-1)^{n-1}\frac{x^n}{n}$| $-1<x\leq 1$|
| $\arctan x$| $\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n+1}}{2n+1}$| $\|x\|\leq 1$|

### C. 级数题做题顺序

1. **先看通项极限**：若 $\lim_{n\to\infty}u_n\ne 0$或极限不存在，直接发散。
2. **看是不是正项级数**（$u_n\geq 0 $；：优先考虑 $p$-级数、等比级数、比较 / 极限比较、比值、根值、积分判别法。
3. **看是不是交错级数**（$(-1)^n$或 $(-1)^{n-1} $；：先判断 $\sum |u_n|$是否绝对收敛；若发散再用莱布尼茨判条件收敛。
4. **看是不是幂级数**（$(x-x_0)^n $；：先求收敛半径，再单独判断端点。

</details>

---

## 第 2 课 · 幂级数、傅里叶级数

### 1. 幂级数收敛域

设幂级数为 $\sum_{n=0}^{\infty} a_n x^n$。求收敛域（**不缺项**时）按以下步骤：

#### 1.1 求收敛半径

若 $\lim_{n\to\infty}\left|\dfrac{a_{n+1}}{a_n}\right|=\rho$或 $\lim_{n\to\infty}\sqrt[n]{|a_n|}=\rho$，则收敛半径 $R=\dfrac{1}{\rho}$，初步收敛区间为 $(-R,R)$。

#### 1.2 检验端点

将 $x=\pm R$代入原幂级数 $\sum a_n x^n$分别判断敛散性。

#### 例 1：$\sum_{n=1}^{\infty}\frac{3^n}{n^2}x^n$的收敛域

根值法：$\lim_{n\to\infty}\sqrt[n]{\left|\frac{3^n}{n^2}\right|}=3$，所以 $\rho=3$，$R=\frac13$，初步区间 $\left(-\frac13,\frac13\right)$。

- $x=\frac13$：$\sum \frac{3^n}{n^2}\left(\frac13\right)^n=\sum\frac1{n^2}$收敛
- $x=-\frac13$：$\sum\frac{(-1)^n}{n^2}$绝对收敛

收敛域 $\left[-\frac13,\frac13\right]$。

#### 例 2：$\sum_{n=0}^{\infty}\frac{n^2+1}{n!}x^n$的收敛域

$\lim_{n\to\infty}\sqrt[n]{\left|\frac{n^2+1}{n!}\right|}=0$，所以 $\rho=0$，$R=+\infty$，收敛域 $(-\infty,+\infty)$。

#### 例 3：$\sum_{n=1}^{\infty}\frac{4^n x^{2n-1}}{n}$的收敛域（缺项幂级数）

**方法一（比值法，最稳）**：设 $u_n(x)=\frac{4^n x^{2n-1}}{n}$，则

$$
\lim_{n\to\infty}\left|\frac{u_{n+1}(x)}{u_n(x)}\right|
=\lim_{n\to\infty}\left|4x^2\cdot\frac{n}{n+1}\right|=4x^2
$$

由比值判别法：$4x^2<1$⇒ $|x|<\frac12$，初步区间 $\left(-\frac12,\frac12\right)$。

- $x=\frac12$：$\sum\frac2n$发散
- $x=-\frac12$：$-\sum\frac2n$发散

收敛域 $\left(-\frac12,\frac12\right)$。

**方法二**：对形如 $\sum a_n x^{mn}$的幂级数，若 $\lim\sqrt[n]{|a_n|}=\rho$，则 $R=\sqrt[m]{\frac1\rho}$。

### 2. 幂级数的性质

设 $\sum a_nx^n$收敛半径 $R_1$，$\sum b_nx^n$收敛半径 $R_2$。

#### 2.1 和、差的收敛半径

- 若 $R_1\ne R_2$：$R=\min\{R_1,R_2\}$
- 若 $R_1=R_2$：$R$可能等于 $R_1$，也可能因抵消而 $R\ge R_1$

#### 2.2 连续性

幂级数的和函数 $S(x)$在其收敛域 $I$上连续。

#### 2.3 逐项积分

若 $S(x)=\sum a_nx^n$，则在收敛区间内：

$$
\int_0^x S(t)\,dt=\sum_{n=0}^{\infty}\frac{a_n}{n+1}x^{n+1}
$$

逐项积分后**收敛半径不变，收敛域可能变大**。

#### 2.4 逐项求导

$$
S'(x)=\sum_{n=1}^{\infty}na_nx^{n-1}
$$

逐项求导后**收敛半径不变，收敛域可能减小**。

### 3. 求和函数常用公式

#### 3.1 几何级数

$$
\frac{1}{1-x}=1+x+x^2+\cdots=\sum_{n=0}^{\infty}x^n,\quad x\in(-1,1)
$$

#### 3.2 变形几何级数

$$
\frac{1}{1+x}=1-x+x^2-\cdots=\sum_{n=0}^{\infty}(-x)^n,\quad x\in(-1,1)
$$

#### 3.3 凑求导

由 $\sum x^{n+1}=\frac{x}{1-x}$两边求导：

$$
\sum_{n=0}^{\infty}(n+1)x^n=\frac{1}{(1-x)^2}
$$

#### 3.4 数项级数求和

数项级数求和 ⇒ 换为幂级数求和（构造辅助幂级数，求出和函数后代入具体 $x $；。

### 4. 常用函数展开

| 函数 | 展开式 | 收敛域 |
|---|---|---|
| $\ln(1+x)$| $\sum_{n=1}^{\infty}\frac{(-1)^{n-1}x^n}{n}$| $(-1,1]$|
| $-\ln(1-x)$| $\sum_{n=1}^{\infty}\frac{x^n}{n}$| $[-1,1)$|
| $e^x$| $\sum_{n=0}^{\infty}\frac{x^n}{n!}$| $(-\infty,+\infty)$|
| $\sin x$| $\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n+1}}{(2n+1)!}$| $(-\infty,+\infty)$|
| $\cos x$| $\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n}}{(2n)!}$| $(-\infty,+\infty)$|

### 5. 傅里叶级数

设周期为 $2l$的函数为 $f(x)$，则其傅里叶级数为：

$$
f(x)\sim \frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{l}+b_n\sin\frac{n\pi x}{l}\right)
$$

其中（$n=1,2,3,\cdots $；：

$$
a_n=\frac{1}{l}\int_{-l}^{l}f(x)\cos\frac{n\pi x}{l}\,dx,\quad
b_n=\frac{1}{l}\int_{-l}^{l}f(x)\sin\frac{n\pi x}{l}\,dx
$$

$$
a_0=\frac{1}{l}\int_{-l}^{l}f(x)\,dx
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 幂级数必须补的内容

#### A.1 一般形式 $\sum a_n(x-x_0)^n$

考试常考 $\sum a_n(x-x_0)^n$（不是 $\sum a_n x^n $；。这时收敛中心是 $x_0$，收敛区间为 $(x_0-R,\ x_0+R)$，再分别检验端点 $x=x_0-R$和 $x=x_0+R$。

#### A.2 特殊情况

- $\rho=0$⇒ $R=+\infty$（如含 $n!$的级数）
- $\rho=+\infty$⇒ $R=0$（只在 $x=0$收敛）

#### A.3 端点判别方法总结

| 端点级数形式 | 判别 |
|---|---|
| $\sum \frac1{n^p}$| $p>1$收敛，$p\leq 1$发散 |
| $\sum \frac{(-1)^n}{n^p}$| 交错级数判别法 |
| $\sum \frac1n$| 调和级数发散 |
| $\sum \frac{(-1)^n}{n}$| 交错调和级数条件收敛 |

#### A.4 逐项积分 / 求导的端点要重判

逐项积分、逐项求导在收敛区间**内部** $(-R,R)$一定成立，但**端点要重新判断**——不能直接照搬原来的端点结论给积分或导数后的级数。

#### A.5 函数展开成幂级数（凑标准形）

常考题：$\dfrac1{2+x},\ \dfrac{x}{1+x^2},\ \ln(2+x),\ e^{-x^2},\ \sin x^2$。

例：$\dfrac1{2+x}=\dfrac12\cdot\dfrac1{1+\frac{x}{2}}=\dfrac12\sum_{n=0}^{\infty}\left(-\dfrac{x}{2}\right)^n$

收敛条件：$\left|\dfrac{x}{2}\right|<1$⇒ $|x|<2$。

#### A.6 补充展开式

$$
(1+x)^\alpha=\sum_{n=0}^{\infty}\binom{\alpha}{n}x^n=1+\alpha x+\frac{\alpha(\alpha-1)}{2!}x^2+\cdots,\quad |x|<1
$$

$$
\arctan x=\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n+1}}{2n+1},\quad x\in[-1,1]
$$

### B. 傅里叶级数必须补的内容

#### B.1 收敛定理（狄利克雷条件）

若 $f(x)$满足狄利克雷条件，傅里叶级数在点 $x$处收敛于：

- **连续点**：$S(x)=f(x)$
- **间断点**：$S(x)=\dfrac{f(x-0)+f(x+0)}{2}$（左右极限平均值）

端点处要看周期延拓后的左右极限。

#### B.2 奇偶函数简化

**偶函数** $f(-x)=f(x)$：$b_n=0$，只有余弦项

$$
f(x)\sim \frac{a_0}{2}+\sum_{n=1}^{\infty}a_n\cos\frac{n\pi x}{l},\quad
a_0=\frac2l\int_0^l f(x)\,dx,\quad
a_n=\frac2l\int_0^l f(x)\cos\frac{n\pi x}{l}\,dx
$$

**奇函数** $f(-x)=-f(x)$：$a_0=0,\ a_n=0$，只有正弦项

$$
f(x)\sim \sum_{n=1}^{\infty}b_n\sin\frac{n\pi x}{l},\quad
b_n=\frac2l\int_0^l f(x)\sin\frac{n\pi x}{l}\,dx
$$

#### B.3 $2\pi$周期的特殊公式（最常考）

当周期为 $2\pi$时 $l=\pi$：

$$
f(x)\sim \frac{a_0}{2}+\sum_{n=1}^{\infty}(a_n\cos nx+b_n\sin nx)
$$

$$
a_0=\frac1\pi\int_{-\pi}^{\pi}f(x)\,dx,\quad
a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos nx\,dx,\quad
b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin nx\,dx
$$

#### B.4 半区间展开（常考点）

题目只给 $0<x<l$上的函数时，要求展开成正弦或余弦级数：

**余弦级数（偶延拓）**：

$$
f(x)\sim \frac{a_0}{2}+\sum_{n=1}^{\infty}a_n\cos\frac{n\pi x}{l},\quad
a_n=\frac2l\int_0^l f(x)\cos\frac{n\pi x}{l}\,dx
$$

**正弦级数（奇延拓）**：

$$
f(x)\sim \sum_{n=1}^{\infty}b_n\sin\frac{n\pi x}{l},\quad
b_n=\frac2l\int_0^l f(x)\sin\frac{n\pi x}{l}\,dx
$$

#### B.5 分段函数分段积分

若 $f(x)=\begin{cases}0,&-\pi<x<0\\ x,&0<x<\pi\end{cases}$，则要分段积分：

$$
a_n=\frac1\pi\left[\int_{-\pi}^{0}f(x)\cos nx\,dx+\int_0^\pi f(x)\cos nx\,dx\right]
$$

$b_n$同样分段。

### C. 易错点提示

1. **"收敛区间" vs "收敛域"**：先由半径得到开区间 $(-R,R)$叫初步收敛**区间**；检验端点后得到的才是最终收敛**域**（可能是 $[-R,R]$、$(-R,R]$、$[-R,R)$或 $(-R,R) $；。
2. **傅里叶级数的 $\sim$不能随便改成 $=$**：$\sim$表示"…的傅里叶级数是…"；只有在连续点处才可以写成 $=$。间断点处等于左右极限平均值，不一定等于 $f(x)$。
3. **缺项幂级数**（如 $x^{2n-1}$、$x^{3n}$等）优先用**比值法**直接求，不要套 $\sum a_n x^{mn}$的公式，最不容易出错。

</details>

---

## 第 3 课 · 平面点集与多元函数

### 1. 二元函数

二元函数：$z=f(x,y),\quad (x,y)\in D$。

### 2. 平面点集中的点

设平面点集为 $E$。

#### 2.1 内点

若存在点 $P$的某邻域 $U(P)$，使 $U(P)\subset E$，则称 $P$为 $E$的**内点**。

#### 2.2 外点

若存在点 $P$的某邻域 $U(P)$，使 $U(P)\cap E=\varnothing$，则称 $P$为 $E$的**外点**。

#### 2.3 边界点

若 $P$的任意邻域 $U(P)$既有属于 $E$的点，又含有不属于 $E$的点，则称 $P$为 $E$的**边界点**。

#### 2.4 聚点

若 $P$的去心邻域 $\mathring U(P,\delta)$内总存在 $E$的点，则称 $P$为 $E$的**聚点**。

### 3. 开集与闭集

#### 3.1 开集

若 $E$的所有点都是 $E$的内点，则称 $E$为**开集**。

常见开集：$\varnothing$、$\mathbb{R}^2$、圆内部、开半平面。

#### 3.2 闭集

若 $E$的所有聚点都属于 $E$，则称 $E$为**闭集**。

常见闭集：$\varnothing$、$\mathbb{R}^2$、直线、闭半平面。

#### 3.3 图示分类

1. 含边界的圆域：闭
2. 不含边界的区域：开
3. 含边界的圆盘：闭
4. 部分边界含有、部分边界不含有的区域：非开非闭

### 4. 连通集与区域

- **开区域** = 连通开集
- **闭区域** = 开区域 ∪ 边界，即 $\overline D = D \cup \partial D$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 标准定义补充

#### A.1 邻域与去心邻域

邻域：$U(P_0,\delta)=\{P: |PP_0|<\delta\}$

若 $P_0=(x_0,y_0)$：$U(P_0,\delta)=\left\{(x,y):\sqrt{(x-x_0)^2+(y-y_0)^2}<\delta\right\}$

去心邻域：$\mathring U(P_0,\delta)=\{P:0<|PP_0|<\delta\}$（把中心点 $P_0$去掉）。

#### A.2 聚点的严谨定义

对任意 $\delta>0$，都有 $\mathring U(P,\delta)\cap E\neq \varnothing$，则 $P$是 $E$的聚点。"任意 $\delta>0$" 很重要。

#### A.3 内部、边界、闭包、孤立点符号

- **内部**：$E^\circ=\{E\text{ 的所有内点}\}$
- **边界**：$\partial E=\{E\text{ 的所有边界点}\}$
- **闭包**：$\overline E=E\cup \partial E$
- **孤立点**：若存在某个去心邻域 $\mathring U(P,\delta)\cap E=\varnothing$，则 $P$为 $E$的孤立点。孤立点属于 $E$，但不是聚点。

### B. 开集闭集判断方法

- $E$是开集 $\Leftrightarrow$$E$中每一点都是内点。例：$x^2+y^2<1$是开集。
- $E$是闭集 $\Leftrightarrow$$E$包含自己的全部聚点 $\Leftrightarrow$$E^c$是开集。例：$x^2+y^2\le 1$是闭集。
- **非开非闭**：如 $0<x^2+y^2\le 1$（含外边界但不含原点，原点是它的聚点但不属于它）。
- **既开又闭**：$\varnothing$和 $\mathbb{R}^2$既是开集也是闭集（选择题高频坑点）。

### C. 区域、闭区域的标准定义

**区域**：在高数里通常把**连通的开集**叫做区域，即 $D$内任意两点都可以用一条完全在 $D$内的曲线连接。

**闭区域**：若 $D$是区域，$\overline D=D\cup \partial D$称为闭区域。

例：$D=\{(x,y):x^2+y^2<1\}$是开区域；$\partial D=\{(x,y):x^2+y^2=1\} $；$\overline D=\{(x,y):x^2+y^2\le 1\}$。

### D. 单连通区域与复连通区域

**单连通区域**：$D$内任意一条简单闭曲线所围成的内部都完全属于 $D$。直观说就是**无洞区域**——在区域内画一个圈，圈可以在区域内连续收缩成一个点。

例：$x^2+y^2<1$、$\mathbb R^2$、半平面 $y>0$都是单连通。

**复连通区域**：$D$中存在一条简单闭曲线，其围成的内部不完全属于 $D$。直观说就是**有洞区域**。

例：圆环 $1<x^2+y^2<4$、$\mathbb R^2\setminus\{(0,0)\}$都是复连通。

**注意**：连通 ≠ 单连通。

- 单连通 ⇒ 连通
- 连通 ⇏ 单连通（圆环连通但不是单连通）

| 区域 | 是否单连通 |
|---|---|
| 圆盘内部 $x^2+y^2<1$| 单连通 |
| 矩形内部 | 单连通 |
| 半平面 $y>0$| 单连通 |
| 全平面 $\mathbb R^2$| 单连通 |
| 去掉原点的平面 $\mathbb R^2\setminus\{(0,0)\}$| 复连通 |
| 圆环 $1<x^2+y^2<4$| 复连通 |

**口诀**：无洞单连通，有洞复连通。

### E. 多元函数补充

#### E.1 定义域

二元函数 $z=f(x,y)$的定义域是使函数表达式有意义的所有点 $(x,y)$的集合。常见限制：

- **分母不能为零**：$\frac{1}{x^2+y^2-1}$要求 $x^2+y^2-1\neq 0$
- **偶次根号内非负**：$\sqrt{1-x^2-y^2}$要求 $x^2+y^2\le 1$
- **对数真数大于零**：$\ln(x+y)$要求 $x+y>0$

#### E.2 二元函数图像

$z=f(x,y)$的图像一般是三维空间中的曲面。

#### E.3 等高线

等高线是 $f(x,y)=C$（$C$为常数）。例：$z=x^2+y^2$的等高线为 $x^2+y^2=C$，是圆。

</details>

---

## 第 4 课 · 二元函数极限

### 1. 二重极限不存在的证明方法

证明 $\lim_{(x,y)\to(x_0,y_0)}f(x,y)$不存在，常用方法：

- **方法 1**：找某一条路径 $P\to P_0$使极限值不存在。
- **方法 2**：找两条不同路径 $P\to P_0$，使极限值不相等。

#### 例 1：$\lim_{\substack{x\to 0\\ y\to 0}}\frac{xy}{x^2+y^2}$

- 路径 1（令 $x=y $；：$\lim_{x\to 0}\frac{x^2}{2x^2}=\frac12$
- 路径 2（令 $y=-x $；：$\lim_{x\to 0}\frac{-x^2}{2x^2}=-\frac12$

两条路径极限不同，所以原极限不存在。

#### 例 2：取直线路径 $y=kx$

$$
\lim_{\substack{x\to 0\\ y=kx\to 0}}\frac{xy}{x^2+y^2}
=\lim_{x\to 0}\frac{kx^2}{x^2+k^2x^2}=\frac{k}{1+k^2}
$$

该值与 $k$有关，因此极限不存在。

#### 例 3：极坐标换元

令 $x=\rho\cos\theta,\ y=\rho\sin\theta$，则 $\frac{xy}{x^2+y^2}=\cos\theta\sin\theta$。

当 $\rho\to 0^+$时结果仍与 $\theta$有关，所以极限不存在。

### 2. 一类常见二重极限

$$
\lim_{\substack{x\to 0\\ y\to 0}}\frac{x^p y^q}{x^m+y^n},\quad m,n\in \mathbb{N}^*,\ p,q>0
$$

- **结论 1**：若 $m,n$中有奇数，极限不存在。
- **结论 2**：若 $m,n$全为偶数：
  - $\frac{p}{m}+\frac{q}{n}>1$⇒ 极限为 $0$
  - $\frac{p}{m}+\frac{q}{n}\le 1$⇒ 极限不存在（可取路径 $y=kx^{\frac{m-p}{q}}$证明）

### 3. 分母趋于 0 的例子

#### 例 1：$\lim_{\substack{x\to 0\\ y\to 0}}\frac{x+y}{x-y}$

取路径 $y=x+x^2$（$x^2$是高于一次的项）：

$$
\lim_{x\to 0}\frac{x+(x+x^2)}{x-(x+x^2)}=\lim_{x\to 0}\frac{2x+x^2}{-x^2}
$$

主要项 $\frac{2x}{-x^2}$趋于无穷，不存在。因此原二重极限不存在。

### 4. 多元初等函数的连续性

多元初等函数（如 $\frac{2x^2-y^2}{1+x^2}$、$e^{x^2+y^2-z^2}$、$\tan(x+y)$等）在其定义域内连续。

### 5. 求极限：夹逼与极坐标

#### 例 1：$\lim_{\substack{x\to 0\\ y\to 0}}\frac{xy}{\sqrt{x^2+y^2}}$

**方法 1（夹逼）**：因 $\sqrt{x^2+y^2}\ge |y|$，所以 $0\le \left|\frac{xy}{\sqrt{x^2+y^2}}\right|\le |x|$。由 $\lim |x|=0$得极限为 $0$。

**方法 2（$0 \times$有界）**：$\left|\frac{xy}{\sqrt{x^2+y^2}}\right|=|x|\sqrt{\frac{y^2}{x^2+y^2}}$，其中 $0\le \sqrt{\frac{y^2}{x^2+y^2}}\le 1$，故为 $0 \times$有界 = $0$。

**方法 3（极坐标）**：$\frac{xy}{\sqrt{x^2+y^2}}=\rho\cos\theta\sin\theta$，因 $|\rho\cos\theta\sin\theta|\le \rho$，$\rho\to 0^+$时极限为 $0$。

### 6. 证明连续

证明二元函数 $f(x,y)$在点 $(x_0,y_0)$连续，即证：

$$
\lim_{(x,y)\to (x_0,y_0)}f(x,y)=f(x_0,y_0)
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 二重极限的严格定义

若当 $(x,y)\to(x_0,y_0)$时 $f(x,y)$无限接近于常数 $A$，记为 $\lim_{(x,y)\to(x_0,y_0)}f(x,y)=A$。

**$\varepsilon-\delta$定义**：对任意 $\varepsilon>0$，存在 $\delta>0$，当 $0<\sqrt{(x-x_0)^2+(y-y_0)^2}<\delta$时，有 $|f(x,y)-A|<\varepsilon$。

### B. 二重极限与路径的逻辑

- 若二重极限存在 $\Rightarrow$沿任意路径趋近的极限都相同。
- **反过来不成立**：只验证几条路径相同，不能说明二重极限存在。**所有直线路径极限相同，也不一定说明二重极限存在。**
  - 证明不存在：找两条路径不同即可。
  - 证明存在：不能只靠几条路径，需要夹逼、极坐标一致估计、连续性等方法。

### C. 二重极限与累次极限

- **二重极限**：$\lim_{(x,y)\to(x_0,y_0)}f(x,y)$
- **累次极限**：$\lim_{x\to x_0}\lim_{y\to y_0}f(x,y)$和 $\lim_{y\to y_0}\lim_{x\to x_0}f(x,y)$

**重要结论**：若二重极限存在，且两个累次极限也存在，则两个累次极限都等于二重极限。

**但**：两个累次极限相等，不一定说明二重极限存在。

反例：$f(x,y)=\frac{xy}{x^2+y^2}$，两个累次极限都是 $0$，但二重极限不存在（沿 $y=x$为 $\frac12$，沿 $y=-x$为 $-\frac12 $；。

### D. 通用公式（$x^p y^q / (x^m+y^n) $；更严谨结论

若 $m,n$为正偶数，则 $\lim_{(x,y)\to(0,0)}\frac{x^p y^q}{x^m+y^n}$：

- $\frac{p}{m}+\frac{q}{n}>1$⇒ 极限为 $0$
- $\frac{p}{m}+\frac{q}{n}=1$⇒ 通常路径相关，极限不存在
- $\frac{p}{m}+\frac{q}{n}<1$⇒ 通常不收敛，极限不存在

**证明（更稳的路径取法）**：取 $x=t^n,\ y=kt^m$，则

$$
\frac{x^p y^q}{x^m+y^n}=\frac{k^q t^{np+mq}}{(1+k^n)t^{mn}}=\frac{k^q}{1+k^n}t^{np+mq-mn}
$$

而 $np+mq-mn>0 \Leftrightarrow \frac{p}{m}+\frac{q}{n}>1$。

### E. 极坐标法的关键判断

补充：$\rho=\sqrt{x^2+y^2}$，且 $(x,y)\to(0,0) \Leftrightarrow \rho\to 0^+$。

**核心判断**：极坐标法判断极限存在时，不能只看有没有 $\theta$，而要看是否能被 $\rho$控制住。

- 反例：$\frac{xy}{x^2+y^2}=\cos\theta\sin\theta$，结果与 $\theta$有关且不随 $\rho\to 0$消失 ⇒ 极限不存在。
- 正例：$\frac{xy}{\sqrt{x^2+y^2}}=\rho\cos\theta\sin\theta$，虽有 $\theta$，但 $|\rho\cos\theta\sin\theta|\le \rho$⇒ 极限为 $0$。

### F. 最后一题补完整

$\lim_{\substack{x\to 0\\ y\to 0}}\frac{x^2y^4}{x^2+y^2}=0$

- **方法一（夹逼）**：$0\le \frac{x^2y^4}{x^2+y^2}\le y^4$，由 $\lim y^4=0$得极限为 $0$。
- **方法二（极坐标）**：$\frac{x^2y^4}{x^2+y^2}=\rho^4\cos^2\theta\sin^4\theta$，$|\cdot|\le \rho^4\to 0$。

### G. 夹逼法常用不等式（核心工具）

$$
|x|\le \sqrt{x^2+y^2},\quad |y|\le \sqrt{x^2+y^2}
$$

$$
x^2+y^2=\rho^2,\quad 2|xy|\le x^2+y^2
$$

$$
\left|\frac{x}{\sqrt{x^2+y^2}}\right|\le 1,\quad \left|\frac{y}{\sqrt{x^2+y^2}}\right|\le 1
$$

</details>

---

## 第 5 课 · 偏导数

### 1. 偏导数与连续性的关系

$$
f(x,y)\text{ 在 }(x_0,y_0)\text{ 处存在偏导数} \not\Rightarrow f(x,y)\text{ 在该点连续}
$$

求某点关于 $x$的偏导数时，可先代入 $y=y_0$，再对 $x$求导。

### 2. 混合偏导数

设 $z=f(x,y)$，则

$$
f_{xy}''(x,y)=\frac{\partial}{\partial y}\left(\frac{\partial z}{\partial x}\right),\quad z_{xy}=\frac{\partial}{\partial y}(z_x).
$$

**混合偏导数连续 ⇒ 相等**：若在点 $(x_0,y_0)$的某邻域内 $z_x,\ z_y,\ z_{xy}$都存在，且 $z_{xy}$在 $(x_0,y_0)$处连续，则

$$
z_{xy}=z_{yx}\quad\text{即}\quad \frac{\partial^2 z}{\partial x\partial y}=\frac{\partial^2 z}{\partial y\partial x}.
$$

### 3. 求某点高阶偏导时的代入规则

可以代入已知坐标；但在继续对某个变量求导时，**不能提前代入该变量的坐标**。一般应先求出偏导函数，再代入相应点的坐标。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 偏导数的标准定义

$$
f_x(x_0,y_0)=\lim_{h\to0}\frac{f(x_0+h,y_0)-f(x_0,y_0)}{h}
$$

$$
f_y(x_0,y_0)=\lim_{h\to0}\frac{f(x_0,y_0+h)-f(x_0,y_0)}{h}
$$

含义：求 $f_x$固定 $y=y_0$，只让 $x$变化；求 $f_y$固定 $x=x_0$，只让 $y$变化。

### B. 混合偏导记号（防写反）

最稳妥的写法：$f_{xy}=(f_x)_y$，$f_{yx}=(f_y)_x$。

即 $f_{xy}=\dfrac{\partial}{\partial y}\left(\dfrac{\partial f}{\partial x}\right)$，$f_{yx}=\dfrac{\partial}{\partial x}\left(\dfrac{\partial f}{\partial y}\right)$。

考试时优先写成 $(f_x)_y$、$(f_y)_x$最安全。

### C. 混合偏导相等的严谨条件

若 $f_{xy},\ f_{yx}$在点 $(x_0,y_0)$的某邻域内连续，则 $f_{xy}(x_0,y_0)=f_{yx}(x_0,y_0)$。

简记：**二阶偏导连续 ⇒ $f_{xy}=f_{yx}$**。

</details>

---

## 第 6 课 · 全微分

### 1. 全微分

若 $z=f(x,y)$，则在 $(x_0,y_0)$处：

$$
\left.dz\right|_{(x_0,y_0)}=f_x(x_0,y_0)\,dx+f_y(x_0,y_0)\,dy
$$

### 2. 判断函数在一点是否可微

令 $A=f_x(x_0,y_0)$，$B=f_y(x_0,y_0)$，$\Delta z=f(x_0+\Delta x,y_0+\Delta y)-f(x_0,y_0)$。

若

$$
\lim_{\substack{\Delta x\to 0\\ \Delta y\to 0}}\frac{\Delta z-(A\Delta x+B\Delta y)}{\sqrt{(\Delta x)^2+(\Delta y)^2}}=0
$$

则 $f(x,y)$在 $(x_0,y_0)$处可微；否则不可微。

### 3. 可微与切平面

可微 ⇔ 图形在该点有切平面。

### 4. 判断偏导函数是否连续

第一步：求该点的偏导数 $f_x(x_0,y_0)$、$f_y(x_0,y_0)$。

第二步：求偏导函数 $f_x(x,y)$、$f_y(x,y)$。

第三步：验证

$$
\lim_{\substack{x\to x_0\\y\to y_0}}f_x(x,y)=f_x(x_0,y_0),\quad \lim_{\substack{x\to x_0\\y\to y_0}}f_y(x,y)=f_y(x_0,y_0)
$$

若以上极限成立，则相应偏导函数在 $(x_0,y_0)$处连续。

### 5. 关系图

$$
f_x,f_y\text{ 连续} \Rightarrow f\text{ 可微} \Rightarrow \begin{cases}f\text{ 连续}\\ f\text{ 的偏导数存在}\end{cases}
$$

条件由上到下是"强 → 弱"。

### 6. 利用全微分求近似值

**步骤**：

1. 将原式写成 $f(x_0+\Delta x,\ y_0+\Delta y)$，并找出 $x_0,\ y_0,\ \Delta x,\ \Delta y$。
2. 利用近似公式：$f(x_0+\Delta x,y_0+\Delta y)\approx f(x_0,y_0)+A\Delta x+B\Delta y$，其中 $A=f_x(x_0,y_0)$，$B=f_y(x_0,y_0)$。
3. 最后代入计算。

### 7. 偏导数定义记忆

$$
f_x(x_0,y_0)=\lim_{x\to x_0}\frac{f(x,y_0)-f(x_0,y_0)}{x-x_0}
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 全增量、全微分与近似公式

设 $\Delta x=x-x_0$，$\Delta y=y-y_0$，则 $\Delta z=f(x_0+\Delta x,y_0+\Delta y)-f(x_0,y_0)$。

若 $f$在 $(x_0,y_0)$可微，则

$$
\Delta z=f_x(x_0,y_0)\Delta x+f_y(x_0,y_0)\Delta y+o(\rho),\quad \rho=\sqrt{(\Delta x)^2+(\Delta y)^2}
$$

全微分是线性主部：$dz=f_x(x_0,y_0)\,dx+f_y(x_0,y_0)\,dy$

近似计算中取 $dx=\Delta x,\ dy=\Delta y$，所以 $\Delta z\approx dz$，即

$$
f(x_0+\Delta x,y_0+\Delta y)\approx f(x_0,y_0)+f_x(x_0,y_0)\Delta x+f_y(x_0,y_0)\Delta y
$$

### B. 可微的严谨逻辑链

$$
f_x,f_y\text{ 在邻域存在且在该点连续} \Rightarrow f\text{ 可微} \Rightarrow \begin{cases}f\text{ 连续}\\ f_x,f_y\text{ 存在}\end{cases}
$$

其余方向一般都不成立。尤其：**偏导数不连续 ⇏ 不可微**（"偏导连续"只是可微的充分条件，不是必要条件）。

> "偏导连续 ⇒ 可微"必须带邻域条件：只知道某一点的两个偏导数存在，不能推出可微。

### C. 切平面方程

考试中最稳的说法：$f(x,y)$在 $(x_0,y_0)$可微 ⇒ $z=f(x,y)$在对应点有切平面。

切平面方程：

$$
z-z_0=f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0),\quad z_0=f(x_0,y_0)
$$

### D. 原笔记修正

"验证 $f_y$连续"右端应为 $f_y(x_0,y_0)$（不能写成 $f_x(x_0,y_0) $；。

</details>

---

## 第 7 课 · 复合函数求偏导

### 1. 抽象多元复合函数求导

#### 例题

设 $z=f(u,v)$，其中 $u=x^2-y^2$，$v=e^{xy}$，且 $f$有连续一阶偏导数。求 $\dfrac{\partial z}{\partial x}$、$\dfrac{\partial z}{\partial y}$。

#### 链式法则推导

$$
\frac{\partial z}{\partial x}=\frac{\partial z}{\partial u}\frac{\partial u}{\partial x}+\frac{\partial z}{\partial v}\frac{\partial v}{\partial x}
$$

由于 $\dfrac{\partial u}{\partial x}=2x$，$\dfrac{\partial v}{\partial x}=ye^{xy}$，所以

$$
\frac{\partial z}{\partial x}=2x\cdot f_1'+ye^{xy}\cdot f_2'
$$

（记 $f_1'=\dfrac{\partial f}{\partial u}$，$f_2'=\dfrac{\partial f}{\partial v} $；

**链式法则图示含义**：$x\to u\to z$，$x\to v\to z$。**每条路径上的导数相乘，再把各路径结果相加**。

#### 混合偏导数连续结论

若 $z=f(x,y)$的两个二阶混合偏导数 $z_{xy},\ z_{yx}$在某区域内都连续，则在该区域内恒有 $z_{xy}=z_{yx}$。

### 2. 隐函数求偏导数

#### 例题

设 $z=z(x,y)$由方程 $z+e^z=xy$所确定，求 $\dfrac{\partial z}{\partial x}$、$\dfrac{\partial z}{\partial y}$、$\dfrac{\partial^2 z}{\partial x^2}$。

##### 方法一：两边直接求导

对 $x$求导：$z_x+e^z z_x=y$，因此 $z_x=\dfrac{y}{1+e^z}$。

同理：$z_y=\dfrac{x}{1+e^z}$。

##### 方法二：化为 $F(x,y,z)=0$

将原式化为 $F(x,y,z)=z+e^z-xy=0$，则

$$
\frac{\partial z}{\partial x}=-\frac{F_x}{F_z},\quad \frac{\partial z}{\partial y}=-\frac{F_y}{F_z}
$$

这里 $F_x=-y$，$F_y=-x$，$F_z=1+e^z$。所以

$$
\frac{\partial z}{\partial x}=-\frac{F_x}{F_z}=-\frac{-y}{1+e^z}=\frac{y}{1+e^z}
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 复合函数求偏导完整公式

设 $z=f(u,v)$，$u=u(x,y)$，$v=v(x,y)$，则

$$
z_x=f_u u_x+f_v v_x,\quad z_y=f_u u_y+f_v v_y,\quad dz=f_u\,du+f_v\,dv
$$

其中 $du=u_xdx+u_ydy$，$dv=v_xdx+v_ydy$。

**符号建议**：统一写 $f_u,\ f_v$最规范（不要写 $f_1',\ f_2'$，容易与一元函数导数混淆）。

#### 原例题补全 $z_y$

由 $u=x^2-y^2,\ v=e^{xy}$，得 $u_x=2x,\ u_y=-2y,\ v_x=ye^{xy},\ v_y=xe^{xy}$。因此

$$
z_x=2x f_u+ye^{xy}f_v,\quad z_y=-2y f_u+xe^{xy}f_v
$$

### B. 参数形式的复合函数求导

若 $z=f(x,y)$，$x=x(t)$，$y=y(t)$，则

$$
\frac{dz}{dt}=f_x\frac{dx}{dt}+f_y\frac{dy}{dt}=f_xx'(t)+f_yy'(t)
$$

### C. 隐函数公式必须补条件 $F_z\ne 0$

最关键前提：$F(x,y,z)=0$，且 $F_z(x_0,y_0,z_0)\ne 0$。

在此条件下，局部才能将 $z$看作 $x,y$的函数，并使用 $z_x=-\dfrac{F_x}{F_z}$，$z_y=-\dfrac{F_y}{F_z}$。

所有偏导都要在 $(x,y,z(x,y))$处取值。

### D. 隐函数二阶偏导（原例题补完整）

已有 $z_x=\dfrac{y}{1+e^z}$。继续对 $x$求导（$y$对 $x$是常数）：

$$
z_{xx}=-\frac{ye^z z_x}{(1+e^z)^2}
$$

代入 $z_x=\dfrac{y}{1+e^z}$，得到

$$
z_{xx}=-\frac{y^2e^z}{(1+e^z)^3}
$$

### E. 满分需要会的题型

1. 用定义求分段函数在原点的偏导数。
2. 求二阶偏导、混合偏导，并判断能否交换求导顺序。
3. 判断函数在某点是否可微，尤其是含根号、分式、分段函数。
4. 用全微分求近似值和误差估计。
5. 对复合函数、参数函数、隐函数求一阶或二阶偏导。

</details>

---

## 第 8 课 · 方向导数及梯度

### 1. 方向导数

设方向 $\ell$的单位方向向量为 $\mathbf e_\ell=(\cos\alpha,\cos\beta)$，其中 $\alpha,\beta$分别为该方向与 $x,y$轴正向的夹角。

#### 1.1 定义

$$
\left.\frac{\partial f}{\partial \ell}\right|_{(x_0,y_0)}=\lim_{t\to 0}\frac{f(x_0+t\cos\alpha,\ y_0+t\cos\beta)-f(x_0,y_0)}{t}
$$

#### 1.2 计算公式

若 $f(x,y)$在 $P_0(x_0,y_0)$处可微，则方向导数存在，且

$$
\left.\frac{\partial f}{\partial \ell}\right|_{(x_0,y_0)}=f_x(x_0,y_0)\cos\alpha+f_y(x_0,y_0)\cos\beta
$$

三元函数类似：

$$
\left.\frac{\partial f}{\partial \ell}\right|_{P_0}=f_x\cos\alpha+f_y\cos\beta+f_z\cos\gamma
$$

### 2. 梯度

$$
\operatorname{grad}f(x_0,y_0)=\nabla f(x_0,y_0)=f_x(x_0,y_0)\mathbf i+f_y(x_0,y_0)\mathbf j
$$

梯度 $\nabla f(x_0,y_0)$是过点 $(x_0,y_0)$的等值线的**法向量**，并指向函数 $f(x,y)$增大最快的方向。

方向导数的向量形式：

$$
\left.\frac{\partial f}{\partial \ell}\right|_{(x_0,y_0)}=\nabla f(x_0,y_0)\cdot \mathbf e_\ell
$$

梯度意义：

- **方向**：函数方向导数最大的方向
- **大小**：函数方向导数的最大值

即 $\max_{\|\mathbf e_\ell\|=1}\dfrac{\partial f}{\partial \ell}=\|\nabla f\|$。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 方向向量必须单位化

公式 $\dfrac{\partial f}{\partial l}=f_x\cos\alpha+f_y\cos\beta$成立的前提是方向向量为**单位向量** $\mathbf e_l=(\cos\alpha,\cos\beta),\ \|\mathbf e_l\|=1$。

若题目给方向向量 $\mathbf v=(a,b)$，**必须先单位化**：

$$
\mathbf e_l=\frac{\mathbf v}{\|\mathbf v\|}=\left(\frac a{\sqrt{a^2+b^2}},\frac b{\sqrt{a^2+b^2}}\right)
$$

于是 $D_lf(x_0,y_0)=f_x(x_0,y_0)\dfrac a{\sqrt{a^2+b^2}}+f_y(x_0,y_0)\dfrac b{\sqrt{a^2+b^2}}$。

这是方向导数计算题最常见的失分点。

### B. 向量公式与极值

$$
D_{\mathbf e}f(x_0,y_0)=\nabla f(x_0,y_0)\cdot \mathbf e,\quad \|\mathbf e\|=1
$$

若 $\theta$是梯度与方向 $\mathbf e$的夹角，则 $D_{\mathbf e}f=|\nabla f|\cos\theta$。由此：

$$
\max D_{\mathbf e}f=|\nabla f|,\quad \min D_{\mathbf e}f=-|\nabla f|
$$

最大方向 $\mathbf e_{\max}=\dfrac{\nabla f}{|\nabla f|}$，最小方向 $\mathbf e_{\min}=-\dfrac{\nabla f}{|\nabla f|}$。

### C. 梯度为零时单独说明

当 $\nabla f(x_0,y_0)=\mathbf 0$时：

- 所有方向的方向导数都为 $0$
- 不存在唯一的"增长最快方向"
- 不能再说梯度方向是增长最快方向（梯度没有方向）

判断题高频陷阱。

### D. "可微"与"方向导数存在"的关系

$$
\text{可微} \Rightarrow \text{任意方向导数存在}
$$

但反过来不成立：$\text{任意方向导数都存在} \not\Rightarrow \text{可微}$。

### E. 等值线的切线与法线方程

若 $f(x,y)=c$，$\nabla f(x_0,y_0)\ne 0$，则等值线在 $(x_0,y_0)$处的切线为

$$
f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)=0
$$

法线方向为 $\nabla f(x_0,y_0)$。

</details>

---

## 第 9 课 · 多元函数极值

### 1. 无条件极值

#### 1.1 必要条件

设 $z=f(x,y)$在点 $(x_0,y_0)$处偏导数都存在，且在该点取得极值，则必有 $f_x(x_0,y_0)=0$，$f_y(x_0,y_0)=0$。

反之，$f_x=f_y=0$不一定取得极值（如鞍点）。

#### 1.2 充分条件（二阶偏导判别法）

设 $z=f(x,y)$在 $(x_0,y_0)$的某邻域内具有连续的一阶及二阶偏导数，且 $f_x(x_0,y_0)=f_y(x_0,y_0)=0$。

记 $A=f_{xx}(x_0,y_0)$，$B=f_{xy}(x_0,y_0)$，$C=f_{yy}(x_0,y_0)$，则：

| 判别式 | 结论 |
|---|---|
| $AC-B^2>0$| 为极值；$A<0$时极大值，$A>0$时极小值 |
| $AC-B^2<0$| 一定不为极值（鞍点） |
| $AC-B^2=0$| 无法判断 |

#### 1.3 求二元函数极值的步骤

**① 求驻点**：解方程组 $\begin{cases}f_x(x,y)=0\\ f_y(x,y)=0\end{cases}$得到全部驻点。

**② 求二阶偏导数**：对每个驻点 $(x_0,y_0)$计算 $A=f_{xx}$、$B=f_{xy}$、$C=f_{yy}$。

**③ 利用判别式判断**：按上表。

### 2. 拉格朗日乘数法求条件极值

求 $z=f(x,y)$在约束 $\varphi(x,y)=0$下的最值（$f,\ \varphi$有连续偏导数）。

**步骤**：

**① 构造拉格朗日函数**：$L(x,y,\lambda)=f(x,y)+\lambda\varphi(x,y)$

**② 求驻点**：解 $\begin{cases}L_x=0\\ L_y=0\\ L_\lambda=0\end{cases}$得到可能的极值点 $(x_0,y_0)$。

**③ 比较函数值**：比较所有可能极值点及约束曲线端点（若有）处的函数值。

### 3. 连续多元函数在有界闭区域上的最值

$$
\begin{cases}
\text{区域内：} & \text{求无条件极值点}\\
\text{边界上：} & \text{求条件极值点}
\end{cases}
$$

边界上的条件极值可使用拉格朗日乘数法或代入消元法。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 极值必要条件要加"内点"

严谨写法：若 $(x_0,y_0)$是定义域的**内点**，且 $f$在该点可微并取得极值，则 $f_x(x_0,y_0)=0$，$f_y(x_0,y_0)=0$。

边界点取得极值时不一定有 $f_x=f_y=0$。例：$f(x,y)=x+y,\ (x,y)\in[0,1]\times[0,1]$，最小值在 $(0,0)$，但 $f_x=f_y=1$。

### B. 求极值候选点不能只找驻点

完整候选点 = **驻点 + 偏导不存在的内点 + 边界点**

若某个内点偏导数不存在，也可能是极值点（绝对值、根式、分段函数题目中尤其要注意）。

### C. 二阶判别法规范写法

记 $\Delta=AC-B^2$：

| 判别式 | 结论 |
|---|---|
| $\Delta>0,\ A>0$| 极小值点 |
| $\Delta>0,\ A<0$| 极大值点 |
| $\Delta<0$| **鞍点**，不是极值点 |
| $\Delta=0$| 不能判定（二阶偏导法失效，不是"没极值"） |

建议将"不是极值"明确记为"鞍点"，更利于做选择判断题。

### D. 局部极值与最值区分

- **极大值、极小值**：局部概念
- **最大值、最小值**：全局概念

二阶偏导判别法通常判断的是**局部极值**，不保证是全区域最值。

### E. 有界闭区域最值的完整流程

设 $f(x,y)$在有界闭区域 $D$上连续，则 $f$必有最大值和最小值（Weierstrass 定理）。

求法：

1. 求区域内部驻点，以及偏导不存在的内点
2. 求每一段边界上的候选点
3. 特别检查边界的端点、角点、交点
4. 计算所有候选点的函数值
5. **比较全部函数值**，最大者为最大值，最小者为最小值

不能只写"内部无条件极值、边界条件极值"，必须最后比较所有候选点处的函数值。

### F. 拉格朗日乘数法补充

#### F.1 向量形式

$$
\nabla f(x,y)+\lambda\nabla\varphi(x,y)=0,\quad \varphi(x,y)=0
$$

#### F.2 约束曲线的奇异点要单独检查

标准拉格朗日条件一般要求 $\nabla\varphi(x,y)\ne 0$。若约束曲线上出现 $\varphi_x=\varphi_y=0$，该点不能直接忽略，应单独代回目标函数检查。

#### F.3 消去 $\lambda$时不能盲目相除

从 $f_x+\lambda\varphi_x=0,\ f_y+\lambda\varphi_y=0$消去 $\lambda$时，不能直接除以 $\varphi_x,\ \varphi_y,\ f_x,\ f_y$（它们可能为零）。最好用交叉相乘或分情况讨论。

</details>

---

## 第 10 课 · 二重积分计算方法

> 记号 $d\sigma$与 $dx\,dy$都表示平面区域面积元素。

### 1. 二重积分化为二次积分

若区域 $D$可写成 $D=\{(x,y)\mid a\le x\le b,\ \varphi_1(x)\le y\le \varphi_2(x)\}$，则

$$
\iint_D f(x,y)\,d\sigma=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)} f(x,y)\,dy
$$

**找积分限的口诀**：在线英定限，限内画直线；**先交的是下限，后交写上限**。

- 固定 $x$时画竖线，先交到的是 $y$的下限，后交到的是 $y$的上限。
- 固定 $y$时画横线，先交到的是 $x$的下限，后交到的是 $x$的上限。

### 2. 例 1：由抛物线和直线围成的区域

计算 $\iint_D xy\,d\sigma$，其中 $D$由 $y^2=x$及 $y=x-2$围成。

由 $y=x-2$得 $x=y+2$，与 $x=y^2$联立得 $y^2=y+2$，所以 $y=-1$或 $y=2$。

固定 $y$，区域中 $x$从抛物线到直线：$y^2\le x\le y+2$，所以

$$
\iint_D xy\,d\sigma=\int_{-1}^{2}dy\int_{y^2}^{y+2}xy\,dx=\frac{45}{8}
$$

### 3. 例 2：交换二次积分顺序

计算 $I=\int_0^1 x^2\,dx\int_x^1 e^{-y^2}\,dy$。

原积分对应 $D=\{(x,y)\mid 0\le x\le 1,\ x\le y\le 1\}$。

因 $\int_x^1 e^{-y^2}\,dy$不好直接积，交换积分顺序。区域改写为 $D=\{(x,y)\mid 0\le y\le 1,\ 0\le x\le y\}$：

$$
I=\int_0^1dy\int_0^y x^2e^{-y^2}\,dx=\frac13\int_0^1 y^3e^{-y^2}\,dy
$$

令 $u=y^2$，$du=2y\,dy$，$y^3dy=\frac12 u\,du$，所以 $I=\frac16\int_0^1 ue^{-u}\,du=\frac16-\frac{1}{3e}$。

### 4. 二重积分的运算性质

#### 4.1 线性性

$$
\iint_D [k_1f+k_2g]\,d\sigma=k_1\iint_D f\,d\sigma+k_2\iint_D g\,d\sigma
$$

#### 4.2 区域可加性

若 $D=D_1\cup D_2$（无公共内部点），则 $\iint_D f\,d\sigma=\iint_{D_1}f\,d\sigma+\iint_{D_2}f\,d\sigma$。

### 5. 二重积分的普通对称性

**关于 $x$轴对称**（看 $y$的奇偶性）：

- 若 $f(x,-y)=-f(x,y)$⇒ $\iint_D f\,d\sigma=0$
- 若 $f(x,-y)=f(x,y)$⇒ $\iint_D f\,d\sigma=2\iint_{D_1}f\,d\sigma$，$D_1=D\cap\{y\ge 0\}$

类似地，区域关于 $y$轴对称时看被积函数关于 $x$的奇偶性。

### 6. 二重积分的轮换对称性

若区域 $D$关于直线 $y=x$对称，则

$$
\iint_D f(x,y)\,d\sigma=\iint_D f(y,x)\,d\sigma
$$

常用于把 $x,y$互换后相加。

#### 例 1

$D=\{(x,y)\mid x^2+y^2\le 4,\ x\ge 0,\ y\ge 0\}$（第一象限四分之一圆，关于 $y=x$对称），求 $I=\iint_D\dfrac{a\sqrt{f(x)}+b\sqrt{f(y)}}{\sqrt{f(x)}+\sqrt{f(y)}}\,d\sigma$。

由轮换对称性：

$$
I=\frac12\iint_D[F(x,y)+F(y,x)]\,d\sigma=\frac12(a+b)\iint_D d\sigma=\frac{a+b}{2}\pi
$$

#### 例 2

$D=\{(x,y)\mid 0\le x\le 1,\ 0\le y\le 1\}$，求 $I=\iint_D \sqrt[3]{x^2-y^2}\,d\sigma$。

$f(y,x)=\sqrt[3]{y^2-x^2}=-\sqrt[3]{x^2-y^2}=-f(x,y)$，所以 $I=-I$，即 $I=0$。

### 7. 极坐标形式的二重积分

直角坐标与极坐标的转换：$x=r\cos\theta$，$y=r\sin\theta$。面积元素 $d\sigma=r\,dr\,d\theta$。

$$
\iint_D f(x,y)\,dxdy=\iint_{D'} f(r\cos\theta,r\sin\theta)\,r\,dr\,d\theta
$$

若极坐标区域写成 $D'=\{(r,\theta)\mid \alpha\le \theta\le \beta,\ \varphi_1(\theta)\le r\le \varphi_2(\theta)\}$，则

$$
\iint_D f\,d\sigma=\int_\alpha^\beta d\theta\int_{\varphi_1(\theta)}^{\varphi_2(\theta)}f(r\cos\theta,r\sin\theta)\,r\,dr
$$

### 8. 乘积型被积函数的性质

若 $D=\{(x,y)\mid a\le x\le b,\ c\le y\le d\}$且被积函数可拆成 $f(x)g(y)$，则

$$
\iint_D f(x)g(y)\,d\sigma=\int_a^b f(x)\,dx\int_c^d g(y)\,dy
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. $X$-型与 $Y$-型区域

**$X$-型区域**（先 $y$后 $x $；：

$$
D=\{(x,y)\mid a\le x\le b,\ \varphi_1(x)\le y\le \varphi_2(x)\},\quad \iint_D f\,d\sigma=\int_a^b dx\int_{\varphi_1(x)}^{\varphi_2(x)}f\,dy
$$

**$Y$-型区域**（先 $x$后 $y $；：

$$
D=\{(x,y)\mid c\le y\le d,\ \psi_1(y)\le x\le \psi_2(y)\},\quad \iint_D f\,d\sigma=\int_c^d dy\int_{\psi_1(y)}^{\psi_2(y)}f\,dx
$$

**选择原则**：哪个方向积分限更简单，就选哪个方向。

### B. 复杂区域必须分割

如果一条直线穿过去，交到的上下边界**中途换了函数**，就必须拆分。

常见必须拆分的情况：

1. 同一方向画直线时，先交到的曲线发生变化
2. 上/下边界不是同一个函数
3. 左/右边界不是同一个函数
4. 区域不是简单的 $X$-型或 $Y$-型
5. 换积分顺序后，新区域需要分段表示

**口诀**：一条直线穿过去，如果交到的上下边界一直不变，就不用拆；如果中途换了边界函数，就必须拆。

### C. 极坐标典型区域（必背）

| 区域 | 极坐标表示 |
|---|---|
| 圆心在原点的圆 $x^2+y^2\le R^2$| $0\le r\le R,\ 0\le \theta\le 2\pi$|
| 第一象限 quarter 圆 | $0\le r\le R,\ 0\le \theta\le \pi/2$|
| 圆环 $a^2\le x^2+y^2\le b^2$| $a\le r\le b,\ 0\le \theta\le 2\pi$|
| 扇形（夹在两射线间） | $\alpha\le \theta\le \beta,\ 0\le r\le R$|
| 圆 $x^2+y^2=2ax$| $r=2a\cos\theta$，$0\le r\le 2a\cos\theta,\ -\pi/2\le \theta\le \pi/2$|
| 圆 $x^2+y^2=2ay$| $r=2a\sin\theta$，$0\le r\le 2a\sin\theta,\ 0\le \theta\le \pi$|

### D. 极坐标使用时机

优先考虑极坐标的情况：

1. 区域是圆、圆环、扇形
2. 边界含有 $x^2+y^2$
3. 被积函数含有 $x^2+y^2$或 $\sqrt{x^2+y^2}$
4. 积分区域关于原点或圆心对称

**常用代换**：

$$
x^2+y^2=r^2,\quad \sqrt{x^2+y^2}=r,\quad x^2-y^2=r^2\cos 2\theta
$$

$$
xy=r^2\sin\theta\cos\theta=\frac12 r^2\sin 2\theta,\quad dxdy=r\,dr\,d\theta
$$

**最后这个 $r$最容易漏**，考试扣分很多。

### E. 一般换元法（雅可比行列式）

设 $x=x(u,v),\ y=y(u,v)$，则

$$
\iint_D f(x,y)\,dxdy=\iint_{D'} f(x(u,v),y(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|dudv
$$

其中

$$
\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}\dfrac{\partial x}{\partial u} & \dfrac{\partial x}{\partial v}\\[6pt] \dfrac{\partial y}{\partial u} & \dfrac{\partial y}{\partial v}\end{vmatrix}
$$

极坐标是特例：$x=r\cos\theta,\ y=r\sin\theta$，$\left|\dfrac{\partial(x,y)}{\partial(r,\theta)}\right|=r$，所以 $dxdy=r\,dr\,d\theta$。

### F. 对称性补全

#### F.1 关于 $y$轴对称（看 $x $；

- $f(-x,y)=-f(x,y)$⇒ $\iint_D f\,d\sigma=0$
- $f(-x,y)=f(x,y)$⇒ 可取右半部分乘 $2$

#### F.2 关于原点对称（看同时变号）

- $f(-x,-y)=-f(x,y)$⇒ $\iint_D f\,d\sigma=0$

例：$f(x,y)=x,\ y,\ x^3,\ xy^2,\ x+y$在关于原点对称区域上可能积分为 $0$。

**注意**：必须区域关于 $y=x$对称才能用轮换对称性。

### G. 比较性质、估值性质、中值定理

**非负性**：$f\ge 0 \Rightarrow \iint_D f\,d\sigma\ge 0$

**比较性质**：$f\le g \Rightarrow \iint_D f\,d\sigma\le \iint_D g\,d\sigma$

**估值性质**：$m\le f\le M \Rightarrow mS_D\le \iint_D f\,d\sigma\le MS_D$，其中 $S_D$是区域面积。

**中值定理**：若 $f$在闭区域 $D$上连续，则存在 $(\xi,\eta)\in D$使 $\iint_D f\,d\sigma=f(\xi,\eta)\cdot S_D$。

### H. 矩形区域乘积拆分的限制

**只有在矩形区域上**才可以直接拆 $\iint_D f(x)g(y)\,d\sigma=\int_a^b f(x)\,dx\int_c^d g(y)\,dy$。

如果区域是三角形（如 $0\le x\le 1,\ 0\le y\le x $；，即使被积函数是 $f(x)g(y)$，也不能直接拆。

### I. 二重积分计算满分步骤

1. **画图**：画出积分区域 $D$。
2. **求交点**：确定区域边界。
3. **判断坐标系**：边界是直线、抛物线优先直角坐标；边界是圆、圆环、扇形或含 $x^2+y^2$优先极坐标。
4. **选择积分顺序**：固定 $x$后 $y$的上下限简单 ⇒ 先 $y$后 $x $；反之亦然。
5. **必要时拆分区域**：一个方向边界变化就拆。
6. **检查对称性**：区域对称 + 被积函数奇偶性 ⇒ 消去或倍乘。
7. **极坐标必写**：$x=r\cos\theta,\ y=r\sin\theta,\ dxdy=r\,dr\,d\theta$。
8. **最后检查**：结果正负号是否合理（面积、质量类积分通常不应为负）。

</details>

---

## 第 11 课 · 三重积分

### 1. 直角坐标系（投影法）

若空间区域 $\Omega$投影到 $xOy$平面为 $D_{xy}$，且 $z_1(x,y)\le z\le z_2(x,y)$，则

$$
\iiint_{\Omega} f(x,y,z)\,dV=\iint_{D_{xy}}\left[\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)\,dz\right]dxdy
$$

**口诀**：先投影，域内画直线；先交写下限，后交写上限。

#### 例 1

计算 $\iiint_{\Omega}x\,dV$，其中 $\Omega$由三个坐标面及平面 $x+2y+z=1$围成。

投影 $D_{xy}:\ x\ge 0,\ y\ge 0,\ x+2y\le 1$，即 $0\le x\le 1,\ 0\le y\le \frac{1-x}{2}$。

$$
I=\int_0^1 dx\int_0^{\frac{1-x}{2}}x(1-x-2y)\,dy=\frac{1}{48}
$$

### 2. 截面法

**适用情形**：以 $x$、$y$、$z$轴为中心轴的旋转体；被积函数仅含单变量。

**基本公式**（按 $z$截面）：

$$
\iiint_{\Omega}f\,dV=\int_{c_1}^{c_2} dz\iint_{D_z}f(x,y,z)\,dxdy
$$

其中 $D_z$表示用平面 $z=\text{常数}$截 $\Omega$得到的截面。

#### 例 2：椭球

计算 $\iiint_{\Omega}z^2\,dxdydz$，其中 $\Omega$由 $\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}=1$围成。

按 $z$截面：固定 $z$时截面为椭圆 $\frac{x^2}{a^2(1-z^2/c^2)}+\frac{y^2}{b^2(1-z^2/c^2)}=1$，面积 $S_{D_z}=\pi ab\left(1-\frac{z^2}{c^2}\right)$。

$$
I=\int_{-c}^{c}z^2\cdot \pi ab\left(1-\frac{z^2}{c^2}\right)dz=\frac{4}{15}\pi abc^3
$$

### 3. 柱面坐标系

**适用情形**：对 $z$轴对称的旋转体；被积函数含 $\sqrt{x^2+y^2}$。

**坐标变换**：$x=r\cos\theta,\ y=r\sin\theta,\ z=z$。体积元 $dV=r\,dr\,d\theta\,dz$。

$$
\iiint_{\Omega}f\,dV=\iiint_{\Omega}f(r\cos\theta,r\sin\theta,z)\,r\,dr\,d\theta\,dz
$$

#### 例 3

计算 $\iiint_{\Omega}z\,dxdydz$，其中 $\Omega$由 $z=x^2+y^2$与 $z=4$围成。

**方法一（投影 + 柱面）**：投影 $x^2+y^2\le 4$，柱面坐标 $0\le r\le 2,\ 0\le \theta\le 2\pi,\ r^2\le z\le 4$。

$$
I=\frac12\int_0^{2\pi}d\theta\int_0^2(16-r^4)r\,dr=\frac{64}{3}\pi
$$

**方法二（截面 + 柱面）**：固定 $z$时 $x^2+y^2\le z$，$S_{D_z}=\pi z$。

$$
I=\int_0^4 z\cdot \pi z\,dz=\frac{64}{3}\pi
$$

### 4. 球面坐标系

**适用情形**：球面；被积函数含 $f(x^2+y^2+z^2)$。

**坐标变换**：

$$
x=r\sin\varphi\cos\theta,\quad y=r\sin\varphi\sin\theta,\quad z=r\cos\varphi
$$

体积元 $dV=r^2\sin\varphi\,dr\,d\theta\,d\varphi$。

### 5. 轮换对称性

若区域为球 $x^2+y^2+z^2\le a^2$（具备 $x,y,z$轮换对称性），则

$$
\iiint_{\Omega}x^2\,dV=\iiint_{\Omega}y^2\,dV=\iiint_{\Omega}z^2\,dV=\frac13\iiint_{\Omega}(x^2+y^2+z^2)\,dV
$$

同理：$\iiint_{\Omega}(x^2+2y^2)\,dV=\iiint_{\Omega}(x^2+y^2+z^2)\,dV$。

#### 例 4

计算 $\iiint_{\Omega}z^2\,dV$，$\Omega=\{x^2+y^2+z^2\le 1\}$。

$$
I=\frac13\iiint_{\Omega}(x^2+y^2+z^2)\,dV=\frac13\iiint_{\Omega}r^2\,dV=\frac{4\pi}{15}
$$

### 6. 普通对称性

以关于 $xOy$平面对称为例：

- $f(x,y,-z)=-f(x,y,z)$⇒ $\iiint_{\Omega}f\,dV=0$
- $f(x,y,-z)=f(x,y,z)$⇒ $\iiint_{\Omega}f\,dV=2\iiint_{\Omega_1}f\,dV$

同理：关于 $yOz$平面对称看 $x $；关于 $xOz$平面对称看 $y $；关于 $xOy$平面对称看 $z$。

#### 例 5：普通对称性 + 球面坐标

计算 $\iiint_{\Omega}(x+y+z^3)\,dV$，$\Omega$由 $x^2+y^2+z^2=2z\ (z\ge 1)$与 $z=\sqrt{x^2+y^2}$围成。

由旋转对称：$\iiint x\,dV=\iiint y\,dV=0$，所以原积分 $=\iiint z^3\,dV$。

球面 $r^2=2r\cos\varphi$⇒ $r=2\cos\varphi $；圆锥 $r\cos\varphi=r\sin\varphi$⇒ $\varphi=\frac{\pi}{4}$。

范围 $0\le \theta\le 2\pi,\ 0\le \varphi\le \frac{\pi}{4},\ 0\le r\le 2\cos\varphi$。

$$
I=\int_0^{2\pi}d\theta\int_0^{\pi/4}\sin\varphi\,d\varphi\int_0^{2\cos\varphi}r^3\cos^3\varphi\cdot r^2\,dr=\frac{31\pi}{15}
$$

### 7. 球面坐标常用曲面转换

#### 7.1 球面

$x^2+y^2+(z-a)^2=a^2$展开为 $x^2+y^2+z^2=2az$，球面坐标 $r^2=2ar\cos\varphi$⇒ $r=2a\cos\varphi$。

#### 7.2 圆锥面

$z=\sqrt{3(x^2+y^2)}$：$r\cos\varphi=\sqrt3\,r\sin\varphi$⇒ $\varphi=\frac{\pi}{6}$。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 三种投影方法

向 $yOz$平面投影：

$$
\iiint_\Omega f\,dV=\iint_{D_{yz}}\left[\int_{x_1(y,z)}^{x_2(y,z)}f\,dx\right]dydz
$$

向 $xOz$平面投影：

$$
\iiint_\Omega f\,dV=\iint_{D_{xz}}\left[\int_{y_1(x,z)}^{y_2(x,z)}f\,dy\right]dxdz
$$

向 $xOy$平面投影：见正文公式。

### B. 积分次序转换与区域分割

**核心方法**：换序先不要急着改上下限，要先把区域 $\Omega$用不等式完整写出来，再重新选择外、中、内变量。

例：$\int_0^1dx\int_0^xdy\int_0^yf(x,y,z)\,dz$对应 $\Omega=\{0\le z\le y\le x\le 1\}$。

### C. 柱面坐标常见曲面转换表

| 直角坐标曲面 | 柱面坐标形式 |
|---|---|
| $x^2+y^2=a^2$| $r=a$|
| $x^2+y^2\le a^2$| $0\le r\le a$|
| $z=x^2+y^2$| $z=r^2$|
| $z=a^2-x^2-y^2$| $z=a^2-r^2$|
| $x^2+y^2+z^2=a^2$| $r^2+z^2=a^2$|
| $z=\sqrt{x^2+y^2}$| $z=r$|
| $z=k\sqrt{x^2+y^2}$| $z=kr$|

**$x^2+y^2=r^2$必须形成条件反射。**

### D. 球面坐标常见曲面转换表（建议半径用 $\rho$避免与柱坐标 $r$混淆）

$x=\rho\sin\varphi\cos\theta,\ y=\rho\sin\varphi\sin\theta,\ z=\rho\cos\varphi$

| 直角坐标曲面 | 球面坐标形式 |
|---|---|
| $x^2+y^2+z^2=a^2$| $\rho=a$|
| $x^2+y^2+z^2=2az$| $\rho=2a\cos\varphi$|
| $x^2+y^2+z^2=2ax$| $\rho=2a\sin\varphi\cos\theta$|
| $z=\sqrt{x^2+y^2}$| $\varphi=\pi/4$|
| $z=\sqrt3\sqrt{x^2+y^2}$| $\varphi=\pi/6$|
| $z=1$| $\rho=\sec\varphi$|
| $x^2+y^2=z^2$| $\varphi=\pi/4$或 $3\pi/4$|

### E. 一般变量代换与雅可比

若 $x=x(u,v,w),\ y=y(u,v,w),\ z=z(u,v,w)$，则 $dV=\left|\dfrac{\partial(x,y,z)}{\partial(u,v,w)}\right|dudvdw$。

**椭球常用代换**：$x=au,\ y=bv,\ z=cw$，则 $dxdydz=abc\,dudvdw$。

椭球 $\frac{x^2}{a^2}+\frac{y^2}{b^2}+\frac{z^2}{c^2}\le 1$⇒ 单位球 $u^2+v^2+w^2\le 1$。

### F. 对称性使用条件（必须同时满足）

不能只看被积函数奇偶性，**还必须看区域是否对称**。

例如 $\iiint_\Omega x\,dV=0$成立的前提是 $\Omega$关于 $yOz$平面对称。

> 对称性判断必须同时检查两个条件：① 区域对称；② 被积函数关于对应变量为奇函数或偶函数。

**口诀**：区域对称看范围，函数奇偶看变量。奇函数积分为零，偶函数可取一半乘二。

### G. 轮换对称性严谨化

$\iiint_\Omega (x^2+2y^2)\,dV=\iiint_\Omega (x^2+y^2+z^2)\,dV$**不是永远成立**，前提是 $\Omega$关于 $x,y,z$三变量具有轮换对称性（如球 $x^2+y^2+z^2\le a^2 $；。

理由：$\iiint x^2\,dV=\iiint y^2\,dV=\iiint z^2\,dV$⇒ 左边 $=3\iiint x^2\,dV$，右边 $=3\iiint x^2\,dV$。

如果区域不是球或不具备轮换对称性，这个等式不一定成立。

### H. 三重积分计算方法选择

| 优先用 | 适用情形 |
|---|---|
| 直角坐标 | 区域由平面围成，如 $x+y+z=1 $；或区域易表示为 $x_1\le x\le x_2,\ y_1(x)\le y\le y_2(x),\ z_1(x,y)\le z\le z_2(x,y)$|
| 柱面坐标 | 出现 $x^2+y^2 $；区域绕 $z$轴旋转对称 |
| 球面坐标 | 出现 $x^2+y^2+z^2 $；区域由球面、圆锥面围成 |

### I. 体积、质量、质心公式

**体积**：$V=\iiint_\Omega 1\,dV$

**质量**：$m=\iiint_\Omega \rho(x,y,z)\,dV$

**质心**（密度为 1 时）：

$$
\bar{x}=\frac1V\iiint_\Omega x\,dV,\quad \bar{y}=\frac1V\iiint_\Omega y\,dV,\quad \bar{z}=\frac1V\iiint_\Omega z\,dV
$$

密度为 $\rho(x,y,z)$时，分母换为 $m$，分子加 $\rho$。

</details>

---

## 第 12 课 · 第一类曲线积分

### 1. 运算性质

#### 1.1 线性性

$$
\int_L (\alpha f+\beta g)\,ds=\alpha\int_L f\,ds+\beta\int_L g\,ds
$$

#### 1.2 路径可加性

若曲线 $L$可分为 $L_1,L_2,\cdots,L_n$，则 $\int_L f\,ds=\int_{L_1}f\,ds+\cdots+\int_{L_n}f\,ds$。

#### 1.3 曲线长度

$\int_L 1\,ds=l$，其中 $l$为曲线 $L$的弧长。

### 2. 弧长公式

#### 2.1 显函数形式

若 $L:y=y(x),\ a\le x\le b$，则 $ds=\sqrt{1+[y'(x)]^2}\,dx$。

#### 2.2 参数形式

若 $L:\begin{cases}x=x(t)\\ y=y(t)\end{cases},\ \alpha\le t\le\beta$，则 $ds=\sqrt{[x'(t)]^2+[y'(t)]^2}\,dt$。

#### 2.3 极坐标形式

若 $L:r=r(\theta),\ \alpha\le\theta\le\beta$，则 $ds=\sqrt{[r(\theta)]^2+[r'(\theta)]^2}\,d\theta$。

#### 2.4 平面曲线微元

$ds=\sqrt{(dx)^2+(dy)^2}$

### 3. 例题 1：平面第一类曲线积分

计算 $\int_L \sqrt{y}\,ds$，其中 $L$是抛物线 $y=x^2$上 $A(0,0)$与 $B(1,1)$之间的弧。

因 $y=x^2,\ y'=2x$，所以 $ds=\sqrt{1+4x^2}\,dx$。又 $0\le x\le 1$，所以 $\sqrt{y}=\sqrt{x^2}=|x|=x$。

$$
\int_L \sqrt{y}\,ds=\int_0^1 x\sqrt{1+4x^2}\,dx=\frac1{12}(5\sqrt5-1)
$$

### 4. 空间曲线第一类曲线积分

若 $\Gamma:\begin{cases}x=x(t)\\ y=y(t)\\ z=z(t)\end{cases},\ \alpha\le t\le\beta$，则

$$
\int_\Gamma f(x,y,z)\,ds=\int_\alpha^\beta f(x(t),y(t),z(t))\sqrt{[x'(t)]^2+[y'(t)]^2+[z'(t)]^2}\,dt
$$

### 5. 例题 2：空间螺旋线

计算 $\int_\Gamma (x^2+y^2+z^2)\,ds$，其中 $\Gamma:\begin{cases}x=a\cos t\\ y=a\sin t\\ z=kt\end{cases},\ 0\le t\le 2\pi$。

$$
\begin{aligned}
I&=\int_0^{2\pi}(a^2+k^2t^2)\sqrt{a^2+k^2}\,dt\\
&=\sqrt{a^2+k^2}\left(2\pi a^2+\frac{8\pi^3k^2}{3}\right)
\end{aligned}
$$

### 6. 普通对称性

#### 6.1 平面曲线关于 $y$轴对称

$$
\int_L f(x,y)\,ds=\begin{cases}2\displaystyle\int_{L_1} f\,ds, & f(-x,y)=f(x,y)\\[6pt] 0, & f(-x,y)=-f(x,y)\end{cases}
$$

其中 $L_1$是 $L$在 $x\ge 0$的一半部分。

#### 6.2 空间曲线关于 $yOz$面对称

类似地，看 $x$的奇偶性。

#### 例 3

椭圆 $\frac{x^2}{4}+\frac{y^2}{3}=1$周长为 $C$，求 $\oint_L (2xy+3x^2+4y^2)\,ds$。

椭圆关于坐标轴对称，$2xy$关于 $x$是奇函数 ⇒ $\oint 2xy\,ds=0$。

由椭圆方程两边乘 $12$：$3x^2+4y^2=12$，所以

$$
\oint_L(2xy+3x^2+4y^2)\,ds=12\oint_L ds=12C
$$

### 7. 轮换对称性

#### 7.1 平面曲线关于 $y=x$对称

$$
\int_L f(x,y)\,ds=\int_L f(y,x)\,ds
$$

特别地，$\int_L f(x)\,ds=\int_L f(y)\,ds=\frac12\int_L[f(x)+f(y)]\,ds$。

#### 7.2 空间曲线关于 $x,y,z$轮换对称

$$
\int_\Gamma f(x,y,z)\,ds=\int_\Gamma f(y,z,x)\,ds=\int_\Gamma f(z,x,y)\,ds
$$

#### 例 4

$L$为球面 $x^2+y^2+z^2=a^2$与平面 $x+y+z=0$的交线，求 $\oint_L(x^2+y^2)\,ds$。

由轮换对称性：$\oint_L x^2\,ds=\oint_L y^2\,ds=\oint_L z^2\,ds=\frac13\oint_L(x^2+y^2+z^2)\,ds$。

平面 $x+y+z=0$过球心，交线是半径为 $a$的大圆，$\oint_L ds=2\pi a$。

$$
\oint_L (x^2+y^2)\,ds=\frac23 a^2\oint_L ds=\frac43\pi a^3
$$

### 8. 形心公式

曲线形心（密度 $\mu=1 $；：

$$
\bar{x}=\frac{\int_L x\,ds}{\int_L ds},\quad \bar{y}=\frac{\int_L y\,ds}{\int_L ds},\quad \bar{z}=\frac{\int_L z\,ds}{\int_L ds}
$$

因此 $\int_L x\,ds=\bar{x}\int_L ds$等。

#### 例 5

$L$同例 4（球面与平面交线，过球心的大圆，圆心为原点）。均匀闭合圆的形心为原点，所以 $\bar{x}=0$。

由形心公式：$\oint_L x\,ds=\bar{x}\oint_L ds=0$。

### 9. 三维坐标下的线元公式

#### 9.1 球坐标

$$
dl=\sqrt{(dr)^2+r^2(d\varphi)^2+r^2\sin^2\varphi(d\theta)^2}
$$

#### 9.2 柱坐标

$$
ds=\sqrt{(dr)^2+r^2(d\theta)^2+(dz)^2}
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 定义与物理意义

$$
\int_L f(x,y)\,ds=\lim_{\lambda\to 0}\sum_{i=1}^n f(\xi_i,\eta_i)\Delta s_i
$$

其中 $\Delta s_i$是小弧段长度。

**物理意义**：若 $f(x,y)$表示曲线 $L$上的线密度，则 $\int_L f\,ds$表示曲线的质量。空间曲线密度为 $\rho(x,y,z)$时，质量 $m=\int_\Gamma \rho\,ds$。

### B. 第一类曲线积分与方向无关

$$
\int_{AB} f\,ds=\int_{BA} f\,ds
$$

这是第一类曲线积分和第二类最大的区别之一（第二类 $\int_{AB}Pdx+Qdy=-\int_{BA}Pdx+Qdy $；。

**口诀**：第一类曲线积分用 $ds$，方向不重要；第二类用 $dx,dy,dz$，方向通常重要。

### C. 完整做题步骤

计算 $\int_L f(x,y,z)\,ds$：

1. **参数化曲线**：$x=x(t),\ y=y(t),\ z=z(t)$
2. **代入被积函数**：$f(x,y,z)\to f(x(t),y(t),z(t))$
3. **计算弧长微元**：$ds=\sqrt{x'^2(t)+y'^2(t)+z'^2(t)}\,dt$
4. **确定参数范围**：$\alpha\le t\le \beta$
5. **化为定积分**：$\int_\alpha^\beta f(x(t),y(t),z(t))\sqrt{x'^2+y'^2+z'^2}\,dt$

**口诀**：**一参数化，二代函数，三算 $ds$，四定限，五积分。**

### D. 分段曲线题

若 $L=L_1+L_2+\cdots+L_n$（如三角形边界、矩形边界、折线段），必须分段算。

例：折线 $(0,0)\to(1,0)\to(1,1)$要拆成：

- $L_1:\ y=0,\ 0\le x\le 1$
- $L_2:\ x=1,\ 0\le y\le 1$

不能直接把整条折线当成一条光滑曲线。

### E. 空间曲线交线型参数化套路

例：$\Gamma:\begin{cases}x^2+y^2=a^2\\ z=x+y\end{cases}$，令 $x=a\cos t,\ y=a\sin t$，则 $z=a\cos t+a\sin t$，然后 $ds=\sqrt{x'^2+y'^2+z'^2}\,dt$。

### F. 常见曲线的 $ds$公式速查表

| 曲线 | 参数化 | $ds$|
|---|---|---|
| 直线段（$A\to B $； | $x=x_1+(x_2-x_1)t,\ y=y_1+(y_2-y_1)t,\ 0\le t\le 1$| $\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\,dt$|
| 圆 | $x=a\cos t,\ y=a\sin t$| $a\,dt$|
| 椭圆 | $x=a\cos t,\ y=b\sin t$| $\sqrt{a^2\sin^2t+b^2\cos^2t}\,dt$|
| 螺旋线 | $x=a\cos t,\ y=a\sin t,\ z=bt$| $\sqrt{a^2+b^2}\,dt$|

### G. 对称性补全

| 对称类型 | 看哪个变量 |
|---|---|
| 关于 $x$轴对称 | $y$的奇偶性 |
| 关于 $y$轴对称 | $x$的奇偶性 |
| 关于原点对称 | $(x,y)\to(-x,-y)$同时变号 |
| 关于 $yOz$面对称 | $x$的奇偶性 |
| 关于 $xOz$面对称 | $y$的奇偶性 |
| 关于 $xOy$面对称 | $z$的奇偶性 |

### H. $ds$永远非负

$$
ds\ge 0
$$

所以第一类曲线积分 $\int_L f\,ds$不会因为方向反过来而变号。

严格写：$ds=\sqrt{x'^2(t)+y'^2(t)}\,|dt|$，做题时一般把参数范围写成从小到大。

### I. 估值性质

- 若 $f(x,y)\ge 0$，则 $\int_L f\,ds\ge 0$
- 若 $m\le f(x,y)\le M$，则 $mL\le \int_L f\,ds\le ML$（$L$为曲线长度）

### J. 形心公式完整版（含 $\bar{y}$、$\bar{z} $；

非均匀密度 $\mu(x,y,z)$：

$$
m=\int_L \mu\,ds,\quad \bar{x}=\frac{\int_L x\mu\,ds}{m},\quad \bar{y}=\frac{\int_L y\mu\,ds}{m},\quad \bar{z}=\frac{\int_L z\mu\,ds}{m}
$$

均匀密度 $\mu=1$时分母变为 $\int_L ds$（曲线长度）。

考试中可用形心快速算 $\int_L x\,ds,\ \int_L y\,ds,\ \int_L z\,ds$。

</details>

---

## 第 13 课 · 第一类曲面积分

### 1. 显函数曲面公式

若 $z=z(x,y)$在 $D_{xy}$（$\Sigma$在 $xOy$面上的投影）上有连续偏导数，则

$$
\iint_{\Sigma} f(x,y,z)\,dS=\iint_{D_{xy}}f(x,y,z(x,y))\sqrt{1+z_x^2+z_y^2}\,dxdy
$$

其中 $z_x=\dfrac{\partial z}{\partial x}$，$z_y=\dfrac{\partial z}{\partial y}$。

### 2. 极坐标系下的曲面面积元素

若曲面可写为 $z=z(r,\theta)$，则

$$
dS=\sqrt{r^2+r^2 z_r^2+z_\theta^2}\,drd\theta
$$

其中 $z_r=\dfrac{\partial z}{\partial r}$，$z_\theta=\dfrac{\partial z}{\partial \theta}$。

### 3. 例 1：球冠积分

计算 $\iint_{\Sigma}\dfrac{dS}{z}$，其中 $\Sigma$是球面 $x^2+y^2+z^2=a^2$被 $z=h\ (0<h<a)$截出的顶部。

上半球面 $z=\sqrt{a^2-r^2}$，投影 $0\le r\le \sqrt{a^2-h^2},\ 0\le \theta\le 2\pi$。

$z_r=-\dfrac{r}{\sqrt{a^2-r^2}}$，$z_\theta=0$，所以 $dS=\dfrac{ar}{\sqrt{a^2-r^2}}drd\theta$。

又 $z=\sqrt{a^2-r^2}$，所以 $\dfrac{dS}{z}=\dfrac{ar}{a^2-r^2}drd\theta$。

$$
\iint_\Sigma \frac{dS}{z}=\int_0^{2\pi}d\theta\int_0^{\sqrt{a^2-h^2}}\frac{ar}{a^2-r^2}\,dr=2\pi a\ln\frac{a}{h}
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 定义与物理意义

$$
\iint_\Sigma f(x,y,z)\,dS
$$

物理意义：若 $f(x,y,z)$是曲面密度，则积分表示曲面质量。特别地 $\iint_\Sigma 1\,dS$就是曲面面积。

### B. 三种投影公式

| 投影面 | 曲面方程 | $dS$|
|---|---|---|
| $xOy$| $z=z(x,y)$| $\sqrt{1+z_x^2+z_y^2}\,dxdy$|
| $yOz$| $x=x(y,z)$| $\sqrt{1+x_y^2+x_z^2}\,dydz$|
| $xOz$| $y=y(x,z)$| $\sqrt{1+y_x^2+y_z^2}\,dxdz$|

圆柱面、竖直平面、侧面曲面经常不能写成 $z=z(x,y)$，需选择合适投影面。

### C. 参数方程法（最通用）

若曲面参数方程 $\vec r=\vec r(u,v)=(x(u,v),y(u,v),z(u,v))$，则

$$
dS=|\vec r_u\times \vec r_v|\,dudv
$$

$$
\iint_\Sigma f\,dS=\iint_D f(x(u,v),y(u,v),z(u,v))|\vec r_u\times \vec r_v|\,dudv
$$

适合球面、圆锥面、圆柱面、参数曲面。

### D. 常见曲面的 $dS$公式

| 曲面 | 参数化 | $dS$|
|---|---|---|
| 球面 $x^2+y^2+z^2=a^2$| $x=a\sin\varphi\cos\theta,\ y=a\sin\varphi\sin\theta,\ z=a\cos\varphi$| $a^2\sin\varphi\,d\varphi d\theta$|
| 圆柱面 $x^2+y^2=a^2$| $x=a\cos\theta,\ y=a\sin\theta,\ z=z$| $a\,d\theta dz$|
| 圆锥面 $z=kr$| （极坐标） | $r\sqrt{1+k^2}\,drd\theta$|
| 平面 $z=Ax+By+C$| | $\sqrt{1+A^2+B^2}\,dxdy$|

### E. 对称性

若 $\Sigma$关于 $yOz$面对称，且 $f(-x,y,z)=-f(x,y,z)$（关于 $x$奇函数），则 $\iint_\Sigma f\,dS=0$。

类似：

- $\iint_\Sigma x\,dS=0$（$\Sigma$关于 $yOz$对称）
- $\iint_\Sigma y\,dS=0$（$\Sigma$关于 $xOz$对称）
- $\iint_\Sigma z\,dS=0$（$\Sigma$关于 $xOy$对称）

**注意**：如果只取上半球面（$z\ge 0 $；，则它不关于 $xOy$对称，$\iint_\Sigma z\,dS$不能直接为 $0$。

### F. 第一类 vs 第二类曲面积分

| 类别 | 形式 | 与方向关系 |
|---|---|---|
| 第一类 | $\iint_\Sigma f(x,y,z)\,dS$| **与方向无关** |
| 第二类 | $\iint_\Sigma P\,dydz+Q\,dzdx+R\,dxdy$| 与曲面**取向**有关 |

第一类曲面积分不用考虑"上侧/下侧/外侧/内侧"；第二类必须考虑方向。

### G. 完整笔记框架（建议结构）

1. 定义与物理意义（$f=1$时为曲面面积）
2. 基本性质（线性性、区域可加性、非负性、对称性）
3. 计算方法一：显函数法（三种投影）
4. 计算方法二：参数方程法（$dS=|\vec r_u\times \vec r_v|\,dudv $；
5. 计算方法三：特殊曲面（球面、圆柱面、圆锥面、平面）
6. 常见技巧（对称性、极坐标、球坐标、选择合适投影面）
7. 典型例题（球冠、圆柱面、平面、圆锥面）

</details>

---

## 第 14 课 · 第二类曲线积分

### 1. 例 1：直接计算

计算 $\int_L xy\,dx$，其中 $L$是抛物线 $y^2=x$上从 $A(1,1)$到 $B(1,-1)$的一段弧。

分段：上半段 $y=\sqrt{x},\ x:1\to 0 $；下半段 $y=-\sqrt{x},\ x:0\to 1$。

$$
\int_L xy\,dx=\int_1^0 x\sqrt{x}\,dx+\int_0^1 x(-\sqrt{x})\,dx=-2\int_0^1 x^{3/2}\,dx=-\frac45
$$

### 2. 第二类曲线积分的对称性

设闭曲线 $L$关于 $y$轴对称，$L_1$是其中一半曲线。

#### 2.1 关于 $\int_L P(x,y)\,dx$

- $P(-x,y)=P(x,y)$（关于 $x$偶）⇒ $\int_L P\,dx=2\int_{L_1}P\,dx$
- $P(-x,y)=-P(x,y)$（关于 $x$奇）⇒ $\int_L P\,dx=0$

#### 2.2 关于 $\int_L Q(x,y)\,dy$

- $Q(-x,y)=Q(x,y)$（关于 $x$偶）⇒ $\int_L Q\,dy=0$
- $Q(-x,y)=-Q(x,y)$（关于 $x$奇）⇒ $\int_L Q\,dy=2\int_{L_1}Q\,dy$

**注意**：第二类曲线积分和方向有关，使用对称性时一定要先看清曲线取向。

### 3. 格林公式

#### 3.1 使用条件

1. 分段光滑闭曲线 $L$围成平面有界闭区域 $D$
2. $P(x,y),Q(x,y)$在 $D$上有一阶连续偏导数
3. $L$取正向

**正向规定**：

- 单连通区域：$L$取**逆时针方向**为正向
- 复连通区域：**外边界逆时针，内边界顺时针**，即"外逆内顺为正"

#### 3.2 格林公式

$$
\oint_L P\,dx+Q\,dy=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)\,dxdy
$$

### 4. 例 3：补线后使用格林公式

计算 $\int_L x^2\,dx+(y-x)\,dy$，其中 $L$是上半圆周 $y=\sqrt{a^2-x^2}$沿逆时针方向。

补 $L_1:\ y=0,\ x:-a\to a$，于是 $L+L_1$围成上半圆区域 $D$。

$P=x^2,\ Q=y-x$⇒ $\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}=-1-0=-1$。

$$
\oint_{L+L_1}=\iint_D(-1)\,dxdy=-\frac12\pi a^2
$$

在 $L_1$上 $y=0,\ dy=0$，$\int_{L_1}=\int_{-a}^{a}x^2\,dx=\frac23 a^3$。

$$
\int_L=-\frac12\pi a^2-\frac23 a^3
$$

### 5. 例 4：挖洞法

计算 $I=\oint_L\dfrac{x\,dy-y\,dx}{4x^2+y^2}$，$L$是以 $(1,0)$为中心、半径 $R>1$的圆周（逆时针）。

被积函数在原点无定义，不能直接用格林公式。

$P=-\dfrac{y}{4x^2+y^2}$，$Q=\dfrac{x}{4x^2+y^2}$，在去掉原点后 $\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}=0$。

补小椭圆 $L_1:\ 4x^2+y^2=\varepsilon^2$（内边界取顺时针）：

$$
\oint_{L+L_1}=0 \Rightarrow I=-\oint_{L_1}\frac{x\,dy-y\,dx}{4x^2+y^2}=-\frac1{\varepsilon^2}\oint_{L_1}(x\,dy-y\,dx)
$$

再用格林公式：$-\dfrac1{\varepsilon^2}\iint_{D_\varepsilon}(-2)\,d\sigma=\dfrac{2}{\varepsilon^2}\cdot \dfrac{\pi\varepsilon^2}{2}=\pi$

$$
I=\pi
$$

### 6. 例 5：空间曲线投影到平面

计算 $I=\oint_\Gamma y\,dx+z\,dy+x\,dz$，$\Gamma:\begin{cases}x^2+y^2+z^2=2az\\ x+z=a\end{cases},\ a>0$。

由 $x+z=a$得 $z=a-x,\ dz=-dx$。代入球面方程：$x^2+y^2+(a-x)^2=2a(a-x)$⇒ $2x^2+y^2=a^2$（椭圆）。

原积分变为 $I=\oint_L(y-x)\,dx+(a-x)\,dy$，$P=y-x,\ Q=a-x$。

$\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}=-1-1=-2$，椭圆 $2x^2+y^2\le a^2$半轴为 $\frac{a}{\sqrt2}$和 $a$，面积 $\dfrac{\pi a^2}{\sqrt2}$。

$$
I=-2\cdot \frac{\pi a^2}{\sqrt2}=-\sqrt2\pi a^2
$$

### 7. 斯托克斯公式

$$
\oint_L P\,dx+Q\,dy+R\,dz=\iint_{\Sigma}\left[\left(\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z}\right)dydz+\left(\frac{\partial P}{\partial z}-\frac{\partial R}{\partial x}\right)dzdx+\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dxdy\right]
$$

向量形式：

$$
\oint_L \mathbf F\cdot d\mathbf r=\iint_\Sigma(\nabla\times \mathbf F)\cdot \mathbf n\,dS
$$

其中 $\mathbf F=(P,Q,R)$，$\nabla\times \mathbf F=\left(\dfrac{\partial R}{\partial y}-\dfrac{\partial Q}{\partial z},\ \dfrac{\partial P}{\partial z}-\dfrac{\partial R}{\partial x},\ \dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}\right)$。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 第二类曲线积分的定义

$$
\int_L P\,dx+Q\,dy=\lim_{\lambda\to 0}\sum_{i=1}^n [P(\xi_i,\eta_i)\Delta x_i+Q(\xi_i,\eta_i)\Delta y_i]
$$

**物理意义**：变力 $\mathbf F=(P,Q)$沿曲线 $L$从 $A$到 $B$所做的功。

### B. 方向性（关键区别于第一类）

$$
\int_{AB}P\,dx+Q\,dy=-\int_{BA}P\,dx+Q\,dy
$$

**方向反转，积分变号**。

### C. 常用计算公式

平面参数形式 $L:\begin{cases}x=x(t)\\ y=y(t)\end{cases}$，起点 $t=\alpha$，终点 $t=\beta$：

$$
\int_L P\,dx+Q\,dy=\int_\alpha^\beta [P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)]\,dt
$$

注意：**下限是起点，上限是终点**（不必 $\alpha<\beta $；。

空间形式：$\int_\Gamma P\,dx+Q\,dy+R\,dz=\int_\alpha^\beta [Px'+Qy'+Rz']\,dt$。

### D. 对称性补全

#### D.1 关于 $x$轴对称

看 $y$的奇偶性：

- $\int_L P\,dx$：$P(x,-y)=-P(x,y)$时为 $0 $；$P(x,-y)=P(x,y)$时翻倍
- $\int_L Q\,dy$：$Q(x,-y)=Q(x,y)$时为 $0 $；$Q(x,-y)=-Q(x,y)$时翻倍

#### D.2 关于 $y$轴对称（见正文）

#### D.3 关于原点对称

看 $(x,y)\to(-x,-y)$同时变号。

**重要提醒**：第二类对称性结论**与第一类相反**（因为 $dx,dy$也有方向）。

### E. 格林公式的负向情况

若 $L$取**负向**（顺时针），则格林公式加负号：

$$
\oint_{L^-} P\,dx+Q\,dy=-\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)\,dxdy
$$

### F. 复连通区域（挖洞法）写清楚

复连通区域 $D$有外边界 $L_{\text{外}}$和内边界 $L_{\text{内}}$：

$$
\oint_{L_{\text{外逆}}}+\oint_{L_{\text{内顺}}}=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)\,dxdy
$$

**挖洞法适用情形**：被积函数在 $D$内有奇点（如分母为零处）。挖一个小圆或小椭圆把奇点排除，再在挖掉后的复连通区域上用格林公式。

### G. 路径无关与全微分（详见第 15 课）

四个等价条件（单连通区域内 $P,Q$有连续偏导）：

1. $\oint_L P\,dx+Q\,dy=0$（任意闭曲线）
2. $\int_L P\,dx+Q\,dy$与路径无关
3. $\dfrac{\partial Q}{\partial x}=\dfrac{\partial P}{\partial y}$
4. $P\,dx+Q\,dy$是某函数 $u(x,y)$的全微分

### H. 斯托克斯公式方向说明

斯托克斯公式中：

- $L$的方向与 $\Sigma$的侧符合**右手定则**：右手四指沿 $L$方向，拇指指向 $\Sigma$的法向量方向。
- 若取相反侧，结果变号。

### I. 注意事项

1. **例 5 的答案与曲线方向有关**：方向反转时结果变号。
2. **不能随便用 $\oint$**：只有闭曲线才能用 $\oint$符号。开曲线用 $\int$。
3. **用格林公式前一定要检查奇点**：如 $\dfrac{-y\,dx+x\,dy}{x^2+y^2}$在原点无定义，不能直接用格林公式。

### J. 第二类曲线积分核心公式速查

$$
\boxed{\oint_L P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,dxdy}
$$

$$
\boxed{\text{路径无关} \Leftrightarrow Q_x=P_y \Leftrightarrow du=P\,dx+Q\,dy}
$$

$$
\boxed{\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma(\nabla\times \mathbf F)\cdot \mathbf n\,dS}
$$

</details>

---

## 第 15 课 · 平面曲线积分与路径无关条件

### 1. 平面曲线积分与路径无关的充要条件

设 $D$为**单连通区域**，函数 $P(x,y),Q(x,y)$在 $D$上有连续一阶偏导数，则下列条件**等价**：

1. **任意闭曲线积分为零**：在 $D$内对任意分段光滑闭曲线 $C$，$\oint_C P\,dx+Q\,dy=0$
2. **曲线积分与路径无关**：任意 $\int_L P\,dx+Q\,dy$只与起点、终点有关
3. **偏导条件成立**：在 $D$内恒有 $\dfrac{\partial Q}{\partial x}=\dfrac{\partial P}{\partial y}$
4. **存在原函数/势函数**：存在 $u(x,y)$使 $du=P\,dx+Q\,dy$
5. **向量场是梯度**：$P\mathbf i+Q\mathbf j=\nabla u(x,y)$

### 2. 例题 1：证明路径无关并计算

证明 $\int_{(1,0)}^{(2,1)}(2xy-y^4+2)\,dx+(x^2-4xy^3)\,dy$与路径无关并计算。

$P=2xy-y^4+2$，$Q=x^2-4xy^3$。

$\dfrac{\partial P}{\partial y}=2x-4y^3$，$\dfrac{\partial Q}{\partial x}=2x-4y^3$，相等。

整个 $xOy$平面是单连通区域，所以积分与路径无关。取折线 $(1,0)\to(2,0)\to(2,1)$：

- 第一段 $y=0,\ dy=0$：$\int_1^2 2\,dx=2$
- 第二段 $x=2,\ dx=0$：$\int_0^1(4-8y^3)\,dy=[4y-2y^4]_0^1=2$

$I=2+2=4$。

**或用势函数**：$u_x=P=2xy-y^4+2$，对 $x$积分：$u=x^2y-xy^4+2x+\varphi(y)$。对 $y$求偏导并与 $Q$比较得 $\varphi'(y)=0$，所以 $u=x^2y-xy^4+2x+C$，$I=u(2,1)-u(1,0)=6-2=4$。

### 3. 例题 2：判断全微分并求参数

$\dfrac{(x+ky)\,dx+y\,dy}{(x+y)^2}$为某二元函数的全微分，求 $k$。

$P=\dfrac{x+ky}{(x+y)^2}$，$Q=\dfrac{y}{(x+y)^2}$。

$$
\frac{\partial P}{\partial y}=\frac{(k-2)x-ky}{(x+y)^3},\quad \frac{\partial Q}{\partial x}=\frac{-2y}{(x+y)^3}
$$

二者相等 ⇒ $(k-2)x-ky=-2y$，比较系数：$k-2=0,\ -k=-2$⇒ $k=2$。

### 4. 全微分方程

若微分方程 $P(x,y)\,dx+Q(x,y)\,dy=0$的左端为某二元函数 $u(x,y)$的全微分（$du=P\,dx+Q\,dy $；，则称其为**全微分方程**。隐式通解为 $u(x,y)=C$。

### 5. 势函数 $u(x,y)$的计算公式

$$
u(x,y)=\int_{(x_0,y_0)}^{(x,y)}P\,dx+Q\,dy
$$

因积分与路径无关，路径可任取。常用折线 $(x_0,y_0)\to(x,y_0)\to(x,y)$：

$$
u(x,y)=\int_{x_0}^{x}P(t,y_0)\,dt+\int_{y_0}^{y}Q(x,s)\,ds
$$

第一段保持 $y=y_0$，第二段保持 $x$不变。

### 6. 例题 3：验证全微分方程并求通解

验证 $ye^{y^2}\,dx+(xe^{y^2}+2xy^2e^{y^2})\,dy=0$为全微分方程并求通解。

$P=ye^{y^2}$，$Q=x(e^{y^2}+2y^2e^{y^2})$。

$\dfrac{\partial P}{\partial y}=e^{y^2}+2y^2e^{y^2}$，$\dfrac{\partial Q}{\partial x}=e^{y^2}+2y^2e^{y^2}$，相等 ⇒ 全微分方程。

取基点 $(0,0)$，路径 $(0,0)\to(x,0)\to(x,y)$：

- 第一段 $y=0$：$P(t,0)=0$，$\int_0^x 0\,dt=0$
- 第二段：$\int_0^y x(e^{s^2}+2s^2e^{s^2})\,ds=x[se^{s^2}]_0^y=xye^{y^2}$

所以 $u(x,y)=xye^{y^2}$，通解 $xye^{y^2}=C$。

### 7. 第二类曲线积分做题流程

**第一步：代入方程，化简积分** — 看曲线是否给出参数/显式/隐式方程，先尝试直接化简。

**第二步：判断曲线是否封闭**

#### 7.1 情况一：$L$不封闭

- 若 $\dfrac{\partial Q}{\partial x}=\dfrac{\partial P}{\partial y}$：与路径无关，可换简单路径（直线、折线、圆弧）
- 否则：考虑"补线 + 格林公式"

#### 7.2 情况二：$L$封闭

- 围成单连通区域 + $\dfrac{\partial Q}{\partial x}=\dfrac{\partial P}{\partial y}$⇒ $\oint_L=0$
- 围成单连通区域 + $\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}\ne 0$但简单 ⇒ 格林公式
- 围成区域 $D$内 $P,Q$有无定义点 ⇒ **挖洞 + 格林公式**

### 8. 本课核心结论

单连通区域内 $\dfrac{\partial P}{\partial y}=\dfrac{\partial Q}{\partial x}$⇒ $\int_L P\,dx+Q\,dy$与路径无关。若 $L$是闭曲线，$\oint_L=0$。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 偏导相等不一定路径无关（必须单连通）

"路径无关"等价条件的**前提是单连通区域**。

反例：$P=\dfrac{-y}{x^2+y^2}$，$Q=\dfrac{x}{x^2+y^2}$。

在去掉原点的区域上 $\dfrac{\partial Q}{\partial x}=\dfrac{\partial P}{\partial y}$成立，但沿单位圆 $x=\cos t,\ y=\sin t$：

$$
\oint_L P\,dx+Q\,dy=\int_0^{2\pi}\frac{-\sin t(-\sin t)+\cos t\cos t}{1}\,dt=\int_0^{2\pi}dt=2\pi\ne 0
$$

原因：去掉原点的平面是**复连通**区域，等价条件不成立。

**判断步骤**：

1. 先看 $P,Q$有没有奇点（分母为零、根号内为负等）
2. 看定义域是否单连通
3. 单连通 + 偏导相等 ⇒ 路径无关

### B. 定义域有无奇点的判断

例：$\dfrac{P\,dx+Q\,dy}{x^2+y^2}$的奇点是原点；$\dfrac{P\,dx+Q\,dy}{x+y}$的奇点是直线 $x+y=0$。

判断步骤：

1. 找出 $P,Q$分母为零、根号内为负、对数真数为零的位置
2. 这些点是否在区域 $D$内
3. 在 $D$内 ⇒ $D$是复连通；不在 ⇒ $D$是单连通

### C. 第二类曲线积分有方向

$$
\int_{AB}P\,dx+Q\,dy=-\int_{BA}P\,dx+Q\,dy
$$

做题时：

- 标清起点终点
- 参数化时下限是起点、上限是终点（不必 $\alpha<\beta $；
- 格林公式使用前先确认方向

### D. 格林公式的方向要求

格林公式要求 $L$取**正向**（单连通：逆时针；复连通：外逆内顺）。

若 $L$取反向，结果加负号：

$$
\oint_{L^-}P\,dx+Q\,dy=-\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)\,dxdy
$$

### E. 补线 + 格林公式的符号

补线 $L_1$使 $L+L_1$闭曲线：

$$
\int_L = \oint_{L+L_1}-\int_{L_1}
$$

注意 $L_1$方向的选择影响 $\int_{L_1}$的符号。如果算出来 $\int_{L_1}$是负的，不要慌——直接代入即可。

### F. 求原函数的两种方法

#### F.1 折线积分法

$$
u(x,y)=\int_{x_0}^{x}P(t,y_0)\,dt+\int_{y_0}^{y}Q(x,s)\,ds
$$

基点 $(x_0,y_0)$通常取 $(0,0)$（保证 $P,Q$在该点有定义）。

#### F.2 偏积分法

- $u(x,y)=\int P(x,y)\,dx+\varphi(y)$（对 $x$积分，加任意 $y$的函数）
- 对 $y$求偏导：$u_y=Q$⇒ 解出 $\varphi'(y)$⇒ 积分得 $\varphi(y)$

两种方法等价，选自己熟悉的。

### G. 考试版流程（4 步判断）

**第一步：看 $P,Q$的定义域**（有没有奇点？定义域是否单连通？）

**第二步：看路径是否封闭**

- 封闭 ⇒ 优先格林公式或 $\oint=0$
- 不封闭 ⇒ 看能否换路径

**第三步：算偏导**（$\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y} $；

- 等于 0 ⇒ 与路径无关
- 不等于 0 ⇒ 用格林公式或直接参数化

**第四步：路径无关**（取简单折线）/ **闭曲线积分**（用格林公式 + 必要时挖洞）

</details>

---

## 第 16 课 · 第二类曲面积分

### 1. 流量与第二类曲面积分

设曲面 $\Sigma$，速度场 $\vec v=P(x,y,z)\vec i+Q(x,y,z)\vec j+R(x,y,z)\vec k$，单位法向量 $\vec n=(\cos\alpha,\cos\beta,\cos\gamma)$。

流量：

$$
M=\iint_{\Sigma}\vec v\cdot \vec n\,dS
$$

由于 $\cos\alpha\,dS=dy\,dz$，$\cos\beta\,dS=dz\,dx$，$\cos\gamma\,dS=dx\,dy$，所以

$$
\iint_{\Sigma}\vec v\cdot \vec n\,dS=\iint_{\Sigma}P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy
$$

其中 $dy\,dz,\ dz\,dx,\ dx\,dy$都是**有向投影面积元素**，有正负号。

### 2. 直接投影法（只含 $dx\,dy$的情形）

若曲面 $\Sigma$可写为 $z=z(x,y)$，投影区域 $D_{xy}$，则

$$
\iint_{\Sigma}R(x,y,z)\,dx\,dy=\pm \iint_{D_{xy}}R(x,y,z(x,y))\,dx\,dy
$$

**符号规则**：上侧取 $+$，下侧取 $-$。

### 3. 例题 1

计算 $\iint_{\Sigma}xyz\,dx\,dy$，其中 $\Sigma$是球面 $x^2+y^2+z^2=1$外侧在 $x\ge 0,\ y\ge 0$的部分。

分上下两片：$\Sigma_1:\ z=\sqrt{1-x^2-y^2}$取上侧；$\Sigma_2:\ z=-\sqrt{1-x^2-y^2}$取下侧。投影 $D_{xy}$为第一象限四分之一圆。

- $\Sigma_1$上侧：$\iint_{\Sigma_1}=\iint_{D_{xy}}xy\sqrt{1-x^2-y^2}\,dxdy$
- $\Sigma_2$下侧取负号 + $z$取负：$\iint_{\Sigma_2}=-\iint_{D_{xy}}xy(-\sqrt{1-x^2-y^2})\,dxdy=\iint_{D_{xy}}xy\sqrt{1-x^2-y^2}\,dxdy$

合计：$2\iint_{D_{xy}}xy\sqrt{1-x^2-y^2}\,dxdy$，转极坐标：

$$
2\int_0^{\pi/2}\cos\theta\sin\theta\,d\theta\int_0^1 r^3\sqrt{1-r^2}\,dr=2\cdot \frac12\cdot \frac{2}{15}=\frac{2}{15}
$$

### 4. 一般曲面 $z=z(x,y)$的统一投影公式

$$
\iint_{\Sigma}P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\pm\iint_{D_{xy}}\left[P(-z_x')+Q(-z_y')+R\right]\,dxdy
$$

**符号规则**：上侧取 $+$，下侧取 $-$。

等价写法：

- 上侧：$\vec n\,dS=(-z_x',-z_y',1)\,dxdy$
- 下侧：$\vec n\,dS=(z_x',z_y',-1)\,dxdy$

### 5. 例题 3

计算 $\iint_{\Sigma}(z^2+x)\,dy\,dz-z\,dx\,dy$，其中 $\Sigma$是 $z=\frac12(x^2+y^2)$介于 $z=0$与 $z=2$之间的部分，取下侧。

投影 $D_{xy}:\ x^2+y^2\le 4$。$z_x'=x$，$z_y'=y$。$P=z^2+x$，$Q=0$，$R=-z$。

取下侧 ⇒ 整体加负号：

$$
\iint_{\Sigma}=-\iint_{D_{xy}}\left[(z^2+x)(-x)+(-z)\right]\,dxdy
$$

代入 $z=\frac12(x^2+y^2)$：

$$
=-\iint_{D_{xy}}\left[\left(\frac14(x^2+y^2)^2+x\right)(-x)-\frac12(x^2+y^2)\right]\,dxdy
$$

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 三种投影方向（不只是 $xOy $；

笔记里只写了投影到 $xOy$面，但考试还经常投影到其他两个方向：

| 曲面方程 | 投影面 | 公式 |
|---|---|---|
| $z=z(x,y)$| $xOy$| $\iint_\Sigma R\,dxdy=\pm\iint_{D_{xy}}R(x,y,z(x,y))\,dxdy$（上侧 $+$，下侧 $- $； |
| $x=x(y,z)$| $yOz$| $\iint_\Sigma P\,dydz=\pm\iint_{D_{yz}}P(x(y,z),y,z)\,dydz$（前侧 $+$，后侧 $- $； |
| $y=y(x,z)$| $xOz$| $\iint_\Sigma Q\,dxdz=\pm\iint_{D_{xz}}Q(x,y(x,z),z)\,dxdz$（右侧 $+$，左侧 $- $； |

### B. 参数方程法

若曲面参数方程 $\vec r=\vec r(u,v)=(x(u,v),y(u,v),z(u,v))$，则

$$
\iint_\Sigma \mathbf F\cdot d\mathbf S=\iint_D \mathbf F\cdot (\vec r_u\times \vec r_v)\,dudv
$$

注意：$\vec r_u\times \vec r_v$的方向决定曲面侧；若要取反向，加负号。

### C. 方向（侧）判断系统总结

#### C.1 闭曲面

- **外侧**：法向量指向区域外（如球外、长方体外）
- **内侧**：法向量指向区域内

闭曲面默认取**外侧**。

#### C.2 非闭曲面

| 曲面方程 | 上/下侧 | 前/后侧 | 左/右侧 |
|---|---|---|---|
| $z=z(x,y)$| 法向量与 $z$正轴同向（$+ $；；反之 $-$| | |
| $x=x(y,z)$| | 法向量与 $x$正轴同向叫前侧（$+ $； | |
| $y=y(x,z)$| | | 法向量与 $y$正轴同向叫右侧（$+ $； |

### D. 高斯公式（核心，详见第 18 课）

$$
\oiint_{\Sigma_{\text{外}}}P\,dydz+Q\,dzdx+R\,dxdy=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)\,dV
$$

#### D.1 闭曲面直接用高斯公式

例：$\Sigma$为球面外侧，$\mathbf F=(x,y,z)$，则

$$
\oiint_\Sigma x\,dydz+y\,dzdx+z\,dxdy=\iiint_\Omega (1+1+1)\,dV=3V
$$

#### D.2 非闭曲面补面法

若 $\Sigma$不闭合，补一个面 $\Sigma_1$使 $\Sigma+\Sigma_1$成闭曲面：

$$
\iint_\Sigma=\oiint_{\Sigma+\Sigma_1}-\iint_{\Sigma_1}
$$

补的面通常选简单平面（如 $z=0$、$z=h $；，方便直接算。

### E. 对称性

第二类曲面积分的对称性**比第一类复杂**，因为 $dydz,\ dzdx,\ dxdy$都是有向投影。

| 曲面关于 | 看被积函数关于 | 奇函数 ⇒ | 偶函数 ⇒ |
|---|---|---|---|
| $yOz$面对称 | $x$| $\iint P\,dydz=0$（P 偶） | $\iint P\,dydz=2\iint_{\Sigma_1}$（P 奇） |
| $xOz$面对称 | $y$| $\iint Q\,dzdx=0$（Q 偶） | 翻倍（Q 奇） |
| $xOy$面对称 | $z$| $\iint R\,dxdy=0$（R 偶） | 翻倍（R 奇） |

**注意**：结论与第一类**相反**（因为有向投影的方向也会变号）。

### F. 例题 3 继续算

承接正文，原积分为：

$$
-\iint_{D_{xy}}\left[-\frac{x}{4}(x^2+y^2)^2-x^2-\frac12(x^2+y^2)\right]\,dxdy
$$

用极坐标 $x=r\cos\theta,\ y=r\sin\theta$，$0\le r\le 2,\ 0\le\theta\le 2\pi$：

$$
I=\int_0^{2\pi}d\theta\int_0^2\left[\frac{r^5\cos\theta}{4}+r^2\cos^2\theta+\frac12 r^2\right]\cdot r\,dr
$$

含 $\cos\theta$的项积分为零（圆对称），剩下：

$$
I=2\pi\int_0^2\left(r^2\cos^2\theta+\frac12 r^2\right)\cdot r\,dr\Big|_{\text{only }\theta\text{-indep}}
$$

更清晰的做法：直接拆成 $\cos^2\theta$项和 $\frac12 r^2$项分别积分。

### G. 第二类曲面积分不要乱乘根号

第一类曲面积分 $dS=\sqrt{1+z_x^2+z_y^2}\,dxdy$。

第二类曲面积分 $\iint R\,dxdy=\pm\iint R\,dxdy$（**没有**根号因子）。

两者公式很像但完全不同，不要混用。

</details>

---

## 第 17 课 · 复习（常用公式与泰勒展开）

### 1. 反三角函数与三角函数导数

$$
(\arcsin x)'=\frac{1}{\sqrt{1-x^2}},\quad (\arccos x)'=-\frac{1}{\sqrt{1-x^2}}
$$

$$
(\arctan x)'=\frac{1}{1+x^2},\quad (\operatorname{arccot}x)'=-\frac{1}{1+x^2}
$$

### 2. 三角函数恒等式

$$
\sec x=\frac{1}{\cos x},\quad \csc x=\frac{1}{\sin x},\quad \cot x=\frac{1}{\tan x}
$$

### 3. 常用幂级数展开

$$
e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots
$$

$$
\sin x=\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n+1}}{(2n+1)!}=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots
$$

$$
\cos x=\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n}}{(2n)!}=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots
$$

$$
\ln(1+x)=\sum_{n=1}^{\infty}(-1)^{n-1}\frac{x^n}{n}=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots
$$

$$
\arctan x=x-\frac{x^3}{3}+\frac{x^5}{5}-\cdots
$$

**注意**：原笔记误将上式写成 $\tan x$。真正的 $\tan x=x+\dfrac{x^3}{3}+\dfrac{2x^5}{15}+\cdots$。

### 4. 广义二项式公式

$$
(1+x)^\alpha=\sum_{n=0}^{\infty}\binom{\alpha}{n}x^n=1+\alpha x+\frac{\alpha(\alpha-1)}{2!}x^2+\frac{\alpha(\alpha-1)(\alpha-2)}{3!}x^3+\cdots
$$

其中 $\dbinom{\alpha}{n}=\dfrac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}$。

### 5. 华里士公式（点火公式）

$$
\int_{0}^{\frac{\pi}{2}}\sin^n x\,dx=\int_0^{\pi/2}\cos^n x\,dx=\begin{cases}\dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac{1}{2}\cdot\dfrac{\pi}{2}, & n\text{ 为偶数}\\[1.2em] \dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac{2}{3}\cdot 1, & n\text{ 为奇数}\end{cases}
$$

### 6. 分部积分公式

$$
\int u\,dv=uv-\int v\,du
$$

### 7. 泰勒公式（麦克劳林展开）

$$
f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(0)}{n!}x^n
$$

常用低阶展开：

| 函数 | 三阶麦克劳林展开 |
|---|---|
| $e^x$| $1+x+\dfrac{x^2}{2}+\dfrac{x^3}{6}+o(x^3)$|
| $\sin x$| $x-\dfrac{x^3}{6}+o(x^3)$|
| $\cos x$| $1-\dfrac{x^2}{2}+o(x^3)$|
| $\arcsin x$| $x+\dfrac{x^3}{6}+o(x^3)$|
| $\ln(1+x)$| $x-\dfrac{x^2}{2}+\dfrac{x^3}{3}+o(x^3)$|
| $(1+x)^\alpha$| $1+\alpha x+\dfrac{\alpha(\alpha-1)}{2}x^2+\dfrac{\alpha(\alpha-1)(\alpha-2)}{6}x^3+o(x^3)$|

### 8. 变上限积分函数

若 $g(t)$在实轴上连续，则 $F(u)=\int_0^u g(t)\,dt$可导，且

$$
F'(u)=g(u)
$$

### 9. 方向导数与梯度（复习）

$$
\frac{\partial f}{\partial l}(x_0,y_0)=\nabla f(x_0,y_0)\cdot \mathbf e
$$

**前提**：函数在该点可微，$\mathbf e$是方向 $l$的**单位**向量（$\|\mathbf e\|=1 $；。

---

## 第 18 课 · 高斯公式、散度

### 1. 高斯公式

#### 1.1 成立条件

1. $\Sigma$是有向、分片光滑的**闭曲面**，围成空间有界闭区域 $\Omega$
2. $P(x,y,z),Q(x,y,z),R(x,y,z)$在 $\Omega$上有一阶连续偏导数
3. $\Sigma$取 $\Omega$的整个边界曲面的**外侧**

#### 1.2 公式

$$
\iint_{\Sigma} P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_{\Omega}\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)\,dV
$$

向量形式：

$$
\iint_{\Sigma} \vec F\cdot \vec n\,dS=\iiint_{\Omega} \operatorname{div}\vec F\,dV
$$

其中 $\vec F=(P,Q,R)$，$\operatorname{div}\vec F=\dfrac{\partial P}{\partial x}+\dfrac{\partial Q}{\partial y}+\dfrac{\partial R}{\partial z}=\nabla\cdot \vec F$。

### 2. 形心公式

$$
\bar{x}=\frac{\iiint_{\Omega}x\,dV}{\iiint_{\Omega}dV}\Rightarrow \iiint_{\Omega}x\,dV=\bar{x}\iiint_{\Omega}dV
$$

### 3. 例题一：补面法

计算 $\iint_{\Sigma}(x^2\cos\alpha+y^2\cos\beta+z^2\cos\gamma)\,dS$，其中 $\Sigma$为锥面 $x^2+y^2=z^2$介于 $z=0$与 $z=h\ (h>0)$之间部分的下侧。

转化为第二类曲面积分：$\iint_\Sigma x^2\,dydz+y^2\,dzdx+z^2\,dxdy$。

补顶面 $\Sigma_1:\ z=h,\ x^2+y^2\le h^2$取上侧。由高斯公式：

$$
\iint_{\Sigma+\Sigma_1}=\iiint_\Omega(2x+2y+2z)\,dV=2\iiint_\Omega(x+y+z)\,dV
$$

由对称性 $\iiint_\Omega x\,dV=\iiint_\Omega y\,dV=0$，剩 $2\iiint_\Omega z\,dV$。投影到 $xOy$平面 $D_{xy}:\ x^2+y^2\le h^2$：

$$
2\iint_{D_{xy}}dxdy\int_{\sqrt{x^2+y^2}}^{h}z\,dz=\iint_{D_{xy}}(h^2-x^2-y^2)\,dxdy=\pi h^4-2\pi\cdot \frac{h^4}{4}=\frac12\pi h^4
$$

所以 $\iint_\Sigma=\iint_{\Sigma+\Sigma_1}-\iint_{\Sigma_1}=\frac12\pi h^4-\pi h^4=-\frac12\pi h^4$。

### 4. 例题二：挖洞法（奇点）

计算 $I=\iint_{\Sigma}\dfrac{x\,dydz+y\,dzdx+z\,dxdy}{(x^2+y^2+z^2)^{3/2}}$，$\Sigma$是 $2x^2+2y^2+z^2=p$的外侧。

$P,Q,R$在 $(0,0,0)$处无定义，不能直接用高斯公式。补小球面 $\Sigma_1:\ x^2+y^2+z^2=\varepsilon^2$取**内侧**，令 $\Omega$为 $\Sigma$与 $\Sigma_1$围成的区域。

计算得 $\dfrac{\partial P}{\partial x}+\dfrac{\partial Q}{\partial y}+\dfrac{\partial R}{\partial z}=0$，所以 $\iint_{\Sigma+\Sigma_1}=0$。

$$
I=-\iint_{\Sigma_1}\frac{x\,dydz+y\,dzdx+z\,dxdy}{(x^2+y^2+z^2)^{3/2}}=-\frac1{\varepsilon^3}\iint_{\Sigma_1}x\,dydz+y\,dzdx+z\,dxdy
$$

$\Sigma_1$取内侧 ⇒ 加负号再用高斯公式：

$$
\iint_{\Sigma_1}x\,dydz+y\,dzdx+z\,dxdy=-\iiint_{\Omega_1}3\,dV=-3\cdot \frac43\pi\varepsilon^3=-4\pi\varepsilon^3
$$

所以 $I=-\dfrac1{\varepsilon^3}\cdot(-4\pi\varepsilon^3)=4\pi$。

### 5. 散度的物理意义

$$
\operatorname{div}\vec F=\lim_{\Delta V\to 0}\frac{\iint_{\Sigma}\vec F\cdot \vec n\,dS}{\Delta V}=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}=\nabla\cdot \vec F
$$

表示流体在点 $M(x,y,z)$处的**单位体积向外流出的流量**（汇聚或发散的速率）。

<details class="gpt-supplement">
<summary>GPT 补充 · 缺漏与满分版建议</summary>

### A. 第二类曲面积分与通量的关系

$$
\iint_\Sigma \mathbf F\cdot \mathbf n\,dS=\iint_\Sigma P\,dydz+Q\,dzdx+R\,dxdy
$$

这个积分就是向量场 $\mathbf F$穿过曲面 $\Sigma$的**通量**。

- 闭曲面外侧积分 $>0$⇒ 通量"流出"
- 闭曲面外侧积分 $<0$⇒ 通量"流入"
- 积分 $=0$⇒ 流出 = 流入

### B. 高斯公式只能直接用于闭曲面

非闭曲面必须**补面**（补一个平面或简单曲面使成闭曲面），再用高斯公式，最后减去补面上的积分：

$$
\iint_\Sigma=\oiint_{\Sigma+\Sigma_1}-\iint_{\Sigma_1}
$$

补的面通常选简单平面：$z=0$、$z=h$、$x=a$、$y=b$等，方便直接算。

### C. 方向判断

| 曲面类型 | "外/上/前/右"侧 |
|---|---|
| 闭曲面（球、立方体） | 法向量指向区域外 |
| $z=z(x,y)$| 法向量与 $z$正轴同向（上侧） |
| $x=x(y,z)$| 法向量与 $x$正轴同向（前侧） |
| $y=y(x,z)$| 法向量与 $y$正轴同向（右侧） |

### D. 什么时候不能直接用高斯公式

#### D.1 分母为零

被积函数分母为零的点（奇点）在 $\Omega$内部。

例：$\dfrac{x\,dydz+y\,dzdx+z\,dxdy}{(x^2+y^2+z^2)^{3/2}}$在原点 $(0,0,0)$处分母为零。

#### D.2 函数在区域内部有奇点

如 $\ln(x^2+y^2+z^2)$在原点处无定义。

#### D.3 处理方法（挖洞法）

补一个小球面（或小椭球面）$\Sigma_1$把奇点挖掉：

1. $\Sigma_1$取**内侧**（相对于挖洞后的区域）
2. 在 $\Sigma$与 $\Sigma_1$围成的复连通区域 $\Omega$上用高斯公式
3. 通常 $\dfrac{\partial P}{\partial x}+\dfrac{\partial Q}{\partial y}+\dfrac{\partial R}{\partial z}=0$，所以 $\oiint_{\Sigma+\Sigma_1}=0$
4. $\iint_\Sigma=-\iint_{\Sigma_1}$，再单独算 $\iint_{\Sigma_1}$（用高斯公式）

### E. 散度的三种情况

#### E.1 散度的计算

$$
\operatorname{div}\vec F=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}
$$

#### E.2 散度为正

$$
\operatorname{div}\vec F>0
$$

称该点为**源**（source），流体从该点向外发散。

#### E.3 散度为负

$$
\operatorname{div}\vec F<0
$$

称该点为**汇**（sink），流体向该点汇聚。

#### E.4 散度为零

$$
\operatorname{div}\vec F=0
$$

称向量场为**无源场**（或管形场）。对任意闭曲面 $\Sigma$：

$$
\oiint_\Sigma \mathbf F\cdot \mathbf n\,dS=0
$$

### F. 常考快速结论

#### F.1 结论一

闭曲面 $\Sigma$围成区域 $\Omega$，$\mathbf F=(x,y,z)$：

$$
\oiint_{\Sigma_{\text{外}}}x\,dydz+y\,dzdx+z\,dxdy=\iiint_\Omega (1+1+1)\,dV=3V_\Omega
$$

#### F.2 结论二

闭曲面 $\Sigma$围成区域 $\Omega$，$\mathbf F=(x^2,y^2,z^2)$：

$$
\oiint_{\Sigma_{\text{外}}}=\iiint_\Omega(2x+2y+2z)\,dV
$$

由对称性，若 $\Omega$关于坐标面对称，$2\iiint_\Omega(x+y+z)\,dV=2\iiint_\Omega z\,dV$。

#### F.3 结论三

若 $\operatorname{div}\vec F=0$且 $\Sigma$闭合包围无源场，则 $\oiint_\Sigma=0$。

### G. 高斯公式做题步骤

**第一步：看曲面是否闭合**

- 闭合 ⇒ 直接用高斯公式
- 不闭合 ⇒ 补面后用

**第二步：看方向是否是外侧**

- 外侧 ⇒ 直接用
- 内侧 ⇒ 加负号

**第三步：检查 $P,Q,R$是否有奇点**

- 无奇点 ⇒ 直接算
- 有奇点 ⇒ 挖洞法

**第四步：计算散度**

$$
\operatorname{div}\vec F=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}
$$

**第五步：计算三重积分**

选择合适坐标系（直角、柱面、球面）计算 $\iiint_\Omega \operatorname{div}\vec F\,dV$。

**第六步：若补面了，最后要减去补面的积分**

$$
\iint_\Sigma=\oiint_{\Sigma+\Sigma_1}-\iint_{\Sigma_1}
$$

</details>

