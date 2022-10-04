﻿using System;

namespace Rolls.Models.Rolls
{
    public class Roll
    {
        public string Id { get; set; }
        public string Quantity { get; set; }
        public string CellInWarehouse { get; set; }
        public string CounterpartyOwner { get; set; }
        public bool IsInWorkshop { get; set; }
        public bool IsUsedUp { get; set; }
        public DateTime? InTheWorkshopWith { get; set; }
        public DateTime? UsedUpWith { get; set; }
    }
}
