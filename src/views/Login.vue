<template>
  <Transition
    appear
    enter-active-class="transition duration-700 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <div class="min-h-screen bg-neu-base flex flex-col items-center">
      <!-- 装饰性背景元素 -->
      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <!-- 左上角装饰 -->
        <div class="absolute -left-16 -top-16 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-violet-200/20 rounded-full blur-3xl"></div>
        
        <!-- 右上角装饰 -->
        <div class="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-bl from-emerald-200/10 to-cyan-200/10 rounded-full blur-3xl"></div>
        
        <!-- 左下角装饰 -->
        <div class="absolute -left-32 -bottom-32 w-96 h-96 bg-gradient-to-tr from-violet-200/10 to-blue-200/10 rounded-full blur-3xl"></div>
        
        <!-- 右下角装饰 -->
        <div class="absolute -right-16 -bottom-16 w-64 h-64 bg-gradient-to-tl from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
        
        <!-- 漂浮的几何图形 -->
        <div class="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-blue-300/20 rounded-lg transform rotate-45 animate-float-slow"></div>
        <div class="absolute top-1/3 right-1/4 w-6 h-6 border-2 border-violet-300/20 rounded-full animate-float-normal"></div>
        <div class="absolute bottom-1/4 left-1/3 w-10 h-10 border-2 border-emerald-300/20 rounded-xl transform -rotate-12 animate-float-fast"></div>
        <div class="absolute bottom-1/3 right-1/3 w-8 h-8 border-2 border-cyan-300/20 rounded-lg transform rotate-12 animate-float-slow"></div>
      </div>

      <!-- 主容器 -->
      <div class="w-full max-w-[375px] mx-auto px-4 flex flex-col min-h-screen py-8">
        <!-- Logo区域 -->
        <Transition
          appear
          enter-active-class="transition duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-200"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="relative flex justify-center mb-12">
            <!-- 背景光效 -->
            <div 
              class="absolute w-[444.23px] h-[203.12px] -left-[34.52px] top-[16.48px] animate-fade-in animation-delay-200"
              style="background: radial-gradient(50% 50% at 50% 50%, rgba(103, 80, 164, 0.08) 0%, rgba(232, 222, 248, 0.08) 50%, transparent 100%)"
            ></div>
            
            <!-- Logo容器 -->
            <div 
              class="mask mask-squircle w-[120px] h-[120px] relative group bg-neu-base shadow-neu-convex hover:shadow-neu-flat transition-all duration-200 ease-out animate-scale-up animation-delay-300"
            >
              <!-- Logo图片 -->
              <div class="relative flex items-center justify-center w-full h-full">
                <img 
                  src="../assets/icons/logo.svg"
                  alt="logo" 
                  class="w-full h-full p-6 mask mask-squircle opacity-90 transition-all duration-300 group-hover:opacity-100 text-neu-text-accent animate-floating" 
                />
              </div>
            </div>
          </div>
        </Transition>

        <!-- 欢迎文本 -->
        <Transition
          appear
          enter-active-class="transition duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-400"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="mb-8">
            <h1 class="text-[32px] text-neu-text-primary leading-[1.2] tracking-[-0.5px] font-medium animate-fade-in">
              欢迎来到 
              <span class="relative inline-flex items-baseline logo-text">
                <span class="inline-block font-bold animate-text-slide-up">
                  <span class="text-neu-text-primary">Fox</span>
                  <span class="text-neu-text-accent">F</span>
                </span>
                <span class="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#475569] to-[#334155] opacity-0 animate-line-expand"></span>
              </span>
            </h1>
            <div class="divider my-2 opacity-20"></div>
            <p class="text-[16px] text-neu-text-secondary animate-fade-in animation-delay-100">
              FoxF让您的游戏体验更轻松
            </p>
          </div>
        </Transition>

        <!-- 登录表单 -->
        <div class="space-y-4">
          <!-- 装饰性元素 -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <!-- 左侧装饰组 -->
            <div class="absolute left-0 inset-y-0 w-32 flex flex-col items-center justify-center gap-8">
              <!-- 垂直渐变线 -->
              <div class="w-[1px] h-32 bg-gradient-to-b from-blue-300/0 via-blue-300/20 to-blue-300/0"></div>
              <!-- 装饰性图形组 -->
              <div class="relative">
                <div class="absolute w-3 h-3 border-2 border-blue-300/30 rotate-45"></div>
                <div class="absolute w-3 h-3 border-2 border-violet-300/30 rotate-45 translate-x-4 translate-y-4"></div>
                <div class="absolute w-2 h-2 bg-gradient-to-br from-blue-400/30 to-violet-400/30 rounded-full translate-x-2 translate-y-2 animate-pulse"></div>
              </div>
            </div>
            
            <!-- 右侧装饰组 -->
            <div class="absolute right-0 inset-y-0 w-32 flex flex-col items-center justify-center gap-8">
              <!-- 垂直渐变线 -->
              <div class="w-[1px] h-32 bg-gradient-to-b from-violet-300/0 via-violet-300/20 to-violet-300/0"></div>
              <!-- 装饰性图形组 -->
              <div class="relative">
                <div class="absolute w-3 h-3 border-2 border-violet-300/30 rotate-45"></div>
                <div class="absolute w-3 h-3 border-2 border-blue-300/30 rotate-45 -translate-x-4 translate-y-4"></div>
                <div class="absolute w-2 h-2 bg-gradient-to-br from-violet-400/30 to-blue-400/30 rounded-full -translate-x-2 translate-y-2 animate-pulse delay-300"></div>
              </div>
            </div>

            <!-- 圆形装饰 -->
            <div class="absolute w-3 h-3 bg-blue-400/30 rounded-full top-20 left-10 animate-pulse"></div>
            <div class="absolute w-2 h-2 bg-violet-400/30 rounded-full top-32 right-12 animate-pulse delay-300"></div>
            <div class="absolute w-4 h-4 bg-emerald-400/30 rounded-full bottom-16 left-16 animate-pulse delay-700"></div>
            
            <!-- 波浪线装饰 -->
            <svg class="absolute top-24 left-16 w-24 h-8 opacity-30" viewBox="0 0 100 20">
              <path d="M0 10 Q25 0, 50 10 T100 10" fill="none" stroke="url(#blue-gradient)" stroke-width="1">
                <animate attributeName="d" 
                  dur="4s" 
                  repeatCount="indefinite"
                  values="M0 10 Q25 0, 50 10 T100 10;
                         M0 10 Q25 20, 50 10 T100 10;
                         M0 10 Q25 0, 50 10 T100 10"/>
              </path>
              <defs>
                <linearGradient id="blue-gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stop-color="rgba(59, 130, 246, 0)"/>
                  <stop offset="50%" stop-color="rgba(59, 130, 246, 0.3)"/>
                  <stop offset="100%" stop-color="rgba(59, 130, 246, 0)"/>
                </linearGradient>
              </defs>
            </svg>
            
            <svg class="absolute top-40 right-20 w-20 h-8 opacity-30" viewBox="0 0 100 20">
              <path d="M0 10 Q25 0, 50 10 T100 10" fill="none" stroke="url(#violet-gradient)" stroke-width="1">
                <animate attributeName="d" 
                  dur="4s" 
                  repeatCount="indefinite"
                  values="M0 10 Q25 20, 50 10 T100 10;
                         M0 10 Q25 0, 50 10 T100 10;
                         M0 10 Q25 20, 50 10 T100 10"
                  begin="1s"/>
              </path>
              <defs>
                <linearGradient id="violet-gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stop-color="rgba(139, 92, 246, 0)"/>
                  <stop offset="50%" stop-color="rgba(139, 92, 246, 0.3)"/>
                  <stop offset="100%" stop-color="rgba(139, 92, 246, 0)"/>
                </linearGradient>
              </defs>
            </svg>
            
            <!-- 几何图形装饰 -->
            <div class="absolute w-8 h-8 border-2 border-blue-300/20 rounded-lg top-48 left-8 animate-spin-slow"></div>
            <div class="absolute w-6 h-6 border-2 border-violet-300/20 rotate-45 top-16 right-16 animate-bounce-slow"></div>
            
            <!-- 星星装饰 -->
            <div class="absolute w-4 h-4 top-12 left-32">
              <svg viewBox="0 0 24 24" class="w-full h-full text-blue-300/30 animate-twinkle">
                <path fill="currentColor" d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
              </svg>
            </div>
            <div class="absolute w-3 h-3 top-36 right-28">
              <svg viewBox="0 0 24 24" class="w-full h-full text-violet-300/30 animate-twinkle delay-500">
                <path fill="currentColor" d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
              </svg>
            </div>
            
            <!-- 光点效果 -->
            <div class="absolute w-2 h-2 bg-gradient-to-r from-blue-400/40 to-violet-400/40 rounded-full top-28 left-24 animate-ping-slow"></div>
            <div class="absolute w-2 h-2 bg-gradient-to-r from-emerald-400/40 to-cyan-400/40 rounded-full bottom-20 right-28 animate-ping-slow delay-500"></div>
          </div>

          <!-- 卡片容器 -->
          <Transition
            appear
            enter-active-class="transition duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-600"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div class="card relative overflow-hidden hover:shadow-2xl transition-all duration-300">
              <!-- 卡片渐变背景 -->
              <div class="absolute inset-0">
                <!-- 主渐变背景 -->
                <div class="absolute inset-0">
                  <div class="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
                  <div class="absolute inset-0 bg-gradient-to-br from-[#f8fafc]/80 via-[#f1f5f9]/80 to-[#e2e8f0]/80"></div>
                </div>
                <!-- 装饰性渐变光效 -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-violet-400/10 blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-400/10 to-cyan-400/10 blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
              </div>
              
              <!-- 卡片内容 -->
              <div class="card-body p-8 relative z-[2] space-y-8">
                <!-- 标题 -->
                <div class="flex items-center justify-center">
                  <span class="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent flex items-center">
                    <i class="mdi mdi-login text-[28px] mr-3 text-blue-500"></i>
                    <span class="text-[28px] font-bold">登录</span>
                  </span>
                </div>
              
                <!-- 表单内容 -->
                <form id="loginForm" @submit.prevent="login">
                  <!-- 用户名输入框 -->
                  <div class="space-y-8">
                    <div class="relative">
                      <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">用户名</label>
                      <div class="relative">
                        <i class="mdi mdi-account text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                        <input 
                          type="text" 
                          v-model="username"
                          name="username"
                          autocomplete="username"
                          placeholder="请输入用户名"
                          class="input w-full h-[44px] min-h-[44px] pl-10 pr-3 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                        />
                      </div>
                      <!-- 错误提示 -->
                      <label class="block mt-1.5 min-h-[20px]" v-if="errors.username">
                        <span class="label-text-alt text-error flex items-center badge badge-error gap-1 h-[20px] min-h-[20px]">
                          <i class="mdi mdi-alert-circle mr-1"></i>
                          {{ errors.username }}
                        </span>
                      </label>
                    </div>

                    <!-- 密码输入框 -->
                    <div class="relative">
                      <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">密码</label>
                      <div class="relative">
                        <i class="mdi mdi-lock text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                        <input 
                          :type="showPassword ? 'text' : 'password'"
                          v-model="password"
                          name="password"
                          autocomplete="current-password"
                          placeholder="请输入密码"
                          class="input w-full h-[44px] min-h-[44px] pl-10 pr-10 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                        />
                        <div class="absolute right-3 top-1/2 -translate-y-1/2">
                          <button 
                            type="button"
                            class="text-slate-400 hover:text-slate-600 transition-colors duration-300"
                            @click="togglePassword"
                            :title="showPassword ? '隐藏密码' : '显示密码'"
                            aria-label="切换密码显示"
                          >
                            <i class="mdi text-[20px]" :class="showPassword ? 'mdi-eye-off' : 'mdi-eye'"></i>
                          </button>
                        </div>
                      </div>
                      <!-- 错误提示 -->
                      <label class="block mt-1.5 min-h-[20px]" v-if="errors.password">
                        <span class="label-text-alt text-error flex items-center badge badge-error gap-1 h-[20px] min-h-[20px]">
                          <i class="mdi mdi-alert-circle mr-1"></i>
                          {{ errors.password }}
                        </span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition>

          <!-- 登录按钮 -->
          <button 
            type="submit"
            form="loginForm"
            class="relative z-10 btn w-full h-[44px] min-h-[44px] mt-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            :disabled="!isValid"
          >
            <i class="mdi mdi-login mr-2 text-[20px]"></i>
            {{ loading ? '登录中...' : '登录' }}
          </button>

          <!-- 解绑和注册按钮 -->
          <div class="flex justify-between mt-4 relative z-10">
            <button 
              type="button"
              class="btn btn-ghost h-[32px] min-h-[32px] px-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
              @click="showUnbindModal = true"
            >
              <i class="mdi mdi-link-off mr-1"></i>
              解绑账号
            </button>
            <button 
              type="button"
              class="btn btn-ghost h-[32px] min-h-[32px] px-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
              @click="showRegisterModal = true"
            >
              <i class="mdi mdi-account-plus mr-1"></i>
              注册账号
            </button>
          </div>
        </div>

        <!-- 底部链接和协议 -->
        <Transition
          appear
          enter-active-class="transition duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-800"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div class="mt-12 pb-8 relative z-10">
            <!-- 用户协议和隐私政策 -->
            <div class="text-center text-sm text-slate-400">
              <span>登录即表示同意</span>
              <button 
                class="btn btn-link btn-xs min-h-0 h-auto px-1 text-blue-500 hover:text-blue-600 text-[14px] hover:bg-transparent hover:no-underline transition-colors duration-300"
                @click="showAgreementModal = true"
              >
                《用户协议》
              </button>
              <span>和</span>
              <button 
                class="btn btn-link btn-xs min-h-0 h-auto px-1 text-blue-500 hover:text-blue-600 text-[14px] hover:bg-transparent hover:no-underline transition-colors duration-300"
                @click="showPrivacyModal = true"
              >
                《隐私政策》
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 模态框和提示组件 -->
      <div class="fixed inset-0 pointer-events-none z-[100]">
        <div class="pointer-events-auto">
          <Toast v-if="showToast" :message="toastMessage" :success="toastSuccess" />
          <Modal :show="showAgreementModal" title="用户协议" @close="showAgreementModal = false">
            <div class="prose prose-sm max-w-none overflow-y-auto">
              <h3>1. 服务内容</h3>
              <p>FoxF 为用户提供专业的游戏辅助工具服务。我们的服务内容包括但不限于：</p>
              <ul>
                <li>专业的驱动刷入与管理功能</li>
                <li>高级会员专享的全功能开启服务</li>
                <li>基础的单透功能支持</li>
                <li>实时的系统状态监控</li>
                <li>安全的账号管理系统</li>
                <li>专业的技术支持服务</li>
              </ul>
              
              <h3>2. 用户责任</h3>
              <p>为了维护良好的使用环境，用户在使用 FoxF 服务时应当遵守以下规定：</p>
              <ul>
                <li>严格遵守相关法律法规，不得从事任何违法违规活动</li>
                <li>保证账号仅供个人使用，不得用于商业用途或出租、转让</li>
                <li>妥善保管账号密码，因个人原因导致的账号被盗用由用户自行承担责任</li>
                <li>不得利用本服务从事任何可能损害其他用户或平台利益的行为</li>
                <li>不得进行任何形式的恶意破解或反向工程</li>
                <li>不得传播任何违法、有害或不当信息</li>
              </ul>
              
              <h3>3. 服务变更</h3>
              <p>为了提供更好的服务体验，FoxF 保留以下权利：</p>
              <ul>
                <li>根据实际情况随时更新或调整服务内容和功能</li>
                <li>因系统维护或升级需要暂时中断服务</li>
                <li>调整会员服务的价格和内容</li>
                <li>修改或更新本协议内容</li>
              </ul>
              <p>重要变更将提前通过站内信、邮件等方式通知用户。</p>
              
              <h3>4. 免责声明</h3>
              <p>在法律允许的范围内，FoxF 不承担以下责任：</p>
              <ul>
                <li>因不可抗力导致的服务中断或数据丢失</li>
                <li>用户因使用本服务而产生的任何直接或间接损失</li>
                <li>用户违反本协议导致的任何后果</li>
                <li>第三方通过任何方式造成的损失</li>
              </ul>
            </div>
          </Modal>
          <Modal :show="showPrivacyModal" title="隐私政策" @close="showPrivacyModal = false">
            <div class="prose prose-sm max-w-none overflow-y-auto">
              <h3>1. 信息收集</h3>
              <p>为了提供更好的服务，我们会收集以下必要的信息：</p>
              <ul>
                <li>账号信息：用户名、加密后的密码、注册时间等</li>
                <li>设备信息：设备型号、系统版本、硬件标识符等</li>
                <li>使用记录：登录时间、IP地址、功能使用情况等</li>
                <li>支付信息：充值记录、订单信息等</li>
                <li>系统日志：错误报告、性能数据等</li>
              </ul>
              
              <h3>2. 信息使用</h3>
              <p>我们收集的信息将严格用于以下用途：</p>
              <ul>
                <li>提供、维护和改进我们的服务</li>
                <li>验证用户身份，保障账号安全</li>
                <li>处理用户反馈和提供客户支持</li>
                <li>发送服务通知和系统更新提醒</li>
                <li>预防欺诈和非法使用</li>
                <li>进行数据分析以改善用户体验</li>
              </ul>
              
              <h3>3. 信息保护</h3>
              <p>我们采取业界标准的数据保护措施来保护您的信息安全：</p>
              <ul>
                <li>使用高强度加密算法对数据进行加密存储</li>
                <li>实施严格的员工访问权限控制</li>
                <li>定期进行安全漏洞扫描和修复</li>
                <li>建立完善的数据备份和恢复机制</li>
                <li>定期进行安全意识培训</li>
                <li>与可信赖的安全服务商合作</li>
              </ul>
              
              <h3>4. 信息共享</h3>
              <p>我们承诺对您的信息进行严格保密，除以下情况外，不会向任何第三方分享您的信息：</p>
              <ul>
                <li>获得您的明确授权</li>
                <li>法律法规要求披露</li>
                <li>保护 FoxF 的合法权益</li>
                <li>应对紧急情况以保护用户或公众安全</li>
              </ul>
              
              <h3>5. 信息存储</h3>
              <p>关于您的信息存储和处理：</p>
              <ul>
                <li>所有数据存储在中国境内的安全服务器中</li>
                <li>采用多重备份机制确保数据安全</li>
                <li>定期清理不必要的数据</li>
                <li>在您注销账号后及时删除相关信息</li>
              </ul>
            </div>
          </Modal>
          <Modal :show="showUnbindModal" title="解绑账号" @close="showUnbindModal = false">
            <form @submit.prevent="handleUnbind" class="space-y-8">
              <div class="relative">
                <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">账号</label>
                <div class="relative">
                  <i class="mdi mdi-account text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                  <input 
                    type="text"
                    v-model="unbindUsername"
                    name="unbind-username"
                    autocomplete="username"
                    placeholder="请输入用户名"
                    class="input w-full h-[44px] min-h-[44px] pl-10 pr-3 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div class="relative">
                <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">密码</label>
                <div class="relative">
                  <i class="mdi mdi-lock text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                  <input 
                    type="password"
                    v-model="unbindPassword"
                    name="unbind-password"
                    autocomplete="current-password"
                    placeholder="请输入密码"
                    class="input w-full h-[44px] min-h-[44px] pl-10 pr-10 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <button 
                type="submit"
                class="relative z-10 btn w-full h-[44px] min-h-[44px] bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                :disabled="!unbindUsername || !unbindPassword"
              >
                <i class="mdi mdi-link-off mr-2 text-[20px]"></i>
                确认解绑
              </button>
            </form>
          </Modal>
          <Modal :show="showRegisterModal" title="创建账号" @close="showRegisterModal = false">
            <form @submit.prevent="handleRegister" class="space-y-8">
              <div class="relative">
                <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">账号</label>
                <div class="relative">
                  <i class="mdi mdi-account text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                  <input 
                    type="text" 
                    v-model="registerUsername"
                    name="register-username"
                    autocomplete="username"
                    placeholder="请输入账号"
                    class="input w-full h-[44px] min-h-[44px] pl-10 pr-3 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">昵称</label>
                <div class="relative">
                  <i class="mdi mdi-account-edit text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                  <input 
                    type="text" 
                    v-model="registerNickname"
                    name="nickname"
                    autocomplete="nickname"
                    placeholder="请输入昵称"
                    class="input w-full h-[44px] min-h-[44px] pl-10 pr-3 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">密码</label>
                <div class="relative">
                  <i class="mdi mdi-lock text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                  <input 
                    type="password" 
                    v-model="registerPassword"
                    name="new-password"
                    autocomplete="new-password"
                    placeholder="请输入密码"
                    class="input w-full h-[44px] min-h-[44px] pl-10 pr-3 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div class="relative">
                <label class="block text-sm font-medium text-slate-600 mb-2 ml-1">确认密码</label>
                <div class="relative">
                  <i class="mdi mdi-lock-check text-slate-400 text-[20px] absolute left-3 top-1/2 -translate-y-1/2 z-10"></i>
                  <input 
                    type="password" 
                    v-model="confirmPassword"
                    name="confirm-password"
                    autocomplete="new-password"
                    placeholder="请再次输入密码"
                    class="input w-full h-[44px] min-h-[44px] pl-10 pr-3 bg-white/50 hover:bg-white/70 focus:bg-white/90 border border-slate-200 hover:border-slate-300 focus:border-slate-400 rounded-xl shadow-sm hover:shadow transition-all duration-300 text-slate-600 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button 
                type="submit"
                class="relative z-10 btn w-full h-[44px] min-h-[44px] bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                :disabled="!registerUsername || !registerPassword || !confirmPassword || !registerNickname"
              >
                <i class="mdi mdi-account-plus mr-2 text-[20px]"></i>
                {{ registerLoading ? '注册中...' : '注册' }}
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { memberApi } from '../api/member'
import Toast from '../components/Toast.vue'
import Modal from '../components/Modal.vue'
import NeuButton from '../components/NeuButton.vue'
import { Transition } from 'vue'

export default defineComponent({
  name: 'Login',
  components: {
    Toast,
    Modal,
    NeuButton,
    Transition
  },
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const loading = ref(false)
    const username = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const errors = ref({ username: '', password: '' })
    const showToast = ref(false)
    const toastMessage = ref('')
    const toastSuccess = ref(false)

    // 解绑账号相关
    const showUnbindModal = ref(false)
    const unbindUsername = ref('')
    const unbindPassword = ref('')
    const unbindLoading = ref(false)

    // 创建账号相关
    const showRegisterModal = ref(false)
    const registerUsername = ref('')
    const registerPassword = ref('')
    const registerNickname = ref('')
    const confirmPassword = ref('')
    const registerLoading = ref(false)

    // 用户协议和隐私政策相关
    const showAgreementModal = ref(false)
    const showPrivacyModal = ref(false)

    // 表单验证
    const validateUsername = () => {
      if (!username.value) {
        errors.value.username = '请输入账号'
        return false
      }
      errors.value.username = ''
      return true
    }

    const validatePassword = () => {
      if (!password.value) {
        errors.value.password = '请输入密码'
        return false
      }
      if (password.value.length < 6) {
        errors.value.password = '密码长度不能小于6位'
        return false
      }
      errors.value.password = ''
      return true
    }

    const isValid = computed(() => {
      return !errors.value.username && !errors.value.password && username.value && password.value
    })

    const resetForm = (clearPassword: boolean = false) => {
      if (clearPassword) {
        password.value = ''
        errors.value.password = ''
      }
      errors.value.username = ''
    }

    const showToastMessage = (message: string, success: boolean) => {
      toastMessage.value = message
      toastSuccess.value = success
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 3000)
    }

    const login = async () => {
      if (!username.value || !password.value) {
        showToastMessage('请输入用户名和密码', false)
        return
      }

      try {
        loading.value = true
        const success = await userStore.login({
          username: username.value,
          password: password.value
        })

        if (success) {
          showToastMessage('登录成功', true)
          // 延迟 1 秒后跳转，给 token 一些生效时间
          setTimeout(() => {
            router.push('/home')
          }, 1000)
        }
      } catch (error: any) {
        console.error('登录失败:', error)
        showToastMessage(error.message || '登录失败，请稍后重试', false)
      } finally {
        loading.value = false
      }
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleUnbind = async () => {
      if (!unbindUsername.value || !unbindPassword.value) {
        showToastMessage('请填写完整信息', false)
        return
      }

      try {
        unbindLoading.value = true
        const response = await memberApi.unbind({
          username: unbindUsername.value,
          password: unbindPassword.value,
        })

        if (response.code === 1) {
          showToastMessage('解绑成功', true)
          showUnbindModal.value = false
          // 清空表单
          unbindUsername.value = ''
          unbindPassword.value = ''
        } else {
          showToastMessage(response.msg, false)
        }
      } catch (error) {
        console.error('解绑失败:', error)
        showToastMessage('解绑失败，请稍后重试', false)
      } finally {
        unbindLoading.value = false
      }
    }

    const handleRegister = async () => {
      if (!registerUsername.value || !registerPassword.value || !confirmPassword.value || !registerNickname.value) {
        showToastMessage('请填写完整信息', false)
        return
      }

      if (registerPassword.value !== confirmPassword.value) {
        showToastMessage('两次输入的密码不一致', false)
        return
      }

      try {
        registerLoading.value = true
        const response = await memberApi.register({
          username: registerUsername.value,
          password: registerPassword.value,
          nickname: registerNickname.value,
        })

        if (response.code === 1) {
          showToastMessage('注册成功', true)
          showRegisterModal.value = false
          // 清空表单
          registerUsername.value = ''
          registerPassword.value = ''
          confirmPassword.value = ''
          registerNickname.value = ''
        } else {
          showToastMessage(response.msg, false)
        }
      } catch (error) {
        console.error('注册失败:', error)
        showToastMessage('注册失败，请稍后重试', false)
      } finally {
        registerLoading.value = false
      }
    }

    return {
      loading,
      username,
      password,
      showPassword,
      errors,
      isValid,
      login,
      togglePassword,
      showToast,
      toastMessage,
      toastSuccess,
      showUnbindModal,
      unbindUsername,
      unbindPassword,
      unbindLoading,
      handleUnbind,
      showRegisterModal,
      registerUsername,
      registerPassword,
      registerNickname,
      confirmPassword,
      registerLoading,
      handleRegister,
      showAgreementModal,
      showPrivacyModal,
    }
  }
})
</script>

<style>
/* 主题颜色变量 */
:root {
  /* 基础颜色 */
  --primary-bg: #f8fafc;  /* Slate 50 */
  --secondary-bg: #f1f5f9;  /* Slate 100 */

  /* 文字颜色 */
  --title-primary: #334155;  /* Slate 700 */
  --title-secondary: #475569;  /* Slate 600 */
  --text-primary: #1e293b;  /* Slate 800 */
  --text-secondary: #64748b;  /* Slate 500 */

  /* 按钮渐变色 */
  --btn-gradient-from: #3b82f6;  /* Blue 500 */
  --btn-gradient-to: #8b5cf6;  /* Violet 500 */
  --btn-hover-from: #2563eb;  /* Blue 600 */
  --btn-hover-to: #7c3aed;  /* Violet 600 */

  /* 边框和阴影 */
  --border-color: #e2e8f0;  /* Slate 200 */
  --shadow: #cbd5e1;  /* Slate 300 */
  --highlight: #FFFFFF;  /* 白色 */

  /* 链接和提示色 */
  --link-color: #3b82f6;  /* Blue 500 */
  --link-hover: #60a5fa;  /* Blue 400 */
  --error-color: #FF6B6B;
  --success-color: #32CD32;
  --info-color: #1E90FF;

  /* 渐变背景色 */
  --gradient-primary: linear-gradient(135deg, #f8fafc, #f1f5f9);  /* Slate 50 到 100 */
  --gradient-secondary: linear-gradient(135deg, #eff6ff, #eef2ff);  /* Blue 50 到 Indigo 50 */
  --gradient-accent: linear-gradient(135deg, #f0f9ff, #faf5ff);  /* Sky 50 到 Purple 50 */

  /* 卡片和输入框 */
  --card-bg: rgba(255, 255, 255, 0.9);
  --input-bg: #FFFFFF;
  --input-hover-bg: #F0FFF0;  /* 蜜露色 */
}

/* 主容器背景 */
.bg-neu-base {
  background: var(--gradient-primary);
  position: relative;
  overflow: hidden;
}

/* 添加背景动画效果 */
.bg-neu-base::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 70%),
    radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.08), transparent 70%),
    linear-gradient(120deg, rgba(99, 102, 241, 0.03), rgba(16, 185, 129, 0.03));
  z-index: 0;
  animation: gradientShift 10s ease-in-out infinite alternate;
}

/* Logo容器样式 */
.logo-container {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(241, 245, 249, 0.9));
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

/* 卡片背景 */
.card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 32px rgba(202, 202, 202, 0.15);
}

/* 输入框背景 */
.input-bordered {
  background: var(--input-bg);
  backdrop-filter: blur(5px);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(202, 202, 202, 0.1);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translateZ(0);
}

.input-bordered:hover {
  background: var(--input-hover-bg);
  border-color: var(--btn-hover-from);
  box-shadow: 0 4px 12px rgba(202, 202, 202, 0.15);
  transform: translateY(-2px);
}

.input-bordered:focus {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 6px 16px rgba(202, 202, 202, 0.2);
}

/* 文字样式 */
.text-neu-text-primary {
  color: var(--title-primary);
}

.text-neu-text-secondary {
  color: var(--text-secondary);
}

.text-neu-text-accent {
  color: var(--link-color);
  transition: color 0.3s ease;
}

.text-neu-text-accent:hover {
  color: var(--link-hover);
}

/* 错误提示文字 */
.text-error {
  color: var(--error-color);
}

/* 成功提示文字 */
.text-success {
  color: var(--success-color);
}

/* 信息提示文字 */
.text-info {
  color: var(--info-color);
}

/* 动画效果增强 */
.animate-floating {
  animation: floating 6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
  transform-origin: center;
}

.logo-container:hover .animate-floating {
  animation-duration: 3s;
}

.logo-container:hover img {
  transform: scale(1.05);
  filter: brightness(1.1) drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3));
}

/* 动画关键帧 */
@keyframes floating {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  20% {
    transform: translate(-4px, -8px) rotate(2deg);
  }
  40% {
    transform: translate(4px, -12px) rotate(-1deg);
  }
  60% {
    transform: translate(4px, -8px) rotate(1deg);
  }
  80% {
    transform: translate(-4px, -2px) rotate(-1deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scale-up {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 动画类 */
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

.animate-scale-up {
  animation: scale-up 0.5s ease-out forwards;
}

/* 动画延迟类 */
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

/* 模态框内容样式 */
.prose {
  color: var(--text-primary);
}

.prose h3 {
  color: var(--title-primary);
  font-size: 1.25rem;
  margin-top: 2rem;
  font-weight: 500;
}

.prose p {
  color: var(--text-primary);
  margin-top: 1rem;
}

.prose ul {
  color: var(--text-primary);
  margin-top: 0.5rem;
  list-style-type: none;
  padding-left: 1.5rem;
}

.prose ul li {
  position: relative;
  padding-left: 1rem;
}

.prose ul li::before {
  content: "";
  position: absolute;
  left: -1rem;
  top: 0.75rem;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--text-secondary);
}

/* 输入框文字样式 */
input {
  color: var(--text-primary);
}

input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

/* 按钮文字悬停效果 */
button:hover {
  color: var(--title-secondary);
}

/* 链接按钮样式 */
.btn-link {
  color: var(--link-color);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-link:hover {
  color: var(--link-hover);
}

/* 更新渐变动画 */
@keyframes gradientShift {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}

/* 漂浮动画 */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) rotate(45deg); }
  50% { transform: translate(10px, -10px) rotate(60deg); }
}

@keyframes float-normal {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-8px, -12px); }
}

@keyframes float-fast {
  0%, 100% { transform: translate(0, 0) rotate(-12deg); }
  50% { transform: translate(12px, -8px) rotate(12deg); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-normal {
  animation: float-normal 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

/* 新增动画 */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-10px) rotate(45deg); }
}

@keyframes ping-slow {
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2); opacity: 0; }
}

.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-500 {
  animation-delay: 500ms;
}

.delay-700 {
  animation-delay: 700ms;
}

/* 星星闪烁动画 */
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

.animate-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}
</style> 