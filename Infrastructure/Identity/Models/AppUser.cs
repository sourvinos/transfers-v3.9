﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Transfers {
    public class AppUser : IdentityUser {
        public string DisplayName { get; set; }
        public bool IsAdmin { get; set; }
        public virtual List<Token> Tokens { get; set; }
    }
}