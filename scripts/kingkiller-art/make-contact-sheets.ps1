param([int]$Columns=4,[int]$Rows=3,[int]$CellWidth=360,[int]$CellHeight=360)
Add-Type -AssemblyName System.Drawing
$root=Resolve-Path (Join-Path $PSScriptRoot '..\..')
$manifest=Get-Content -LiteralPath (Join-Path $PSScriptRoot 'manifest.json') -Raw | ConvertFrom-Json
$out=Join-Path $PSScriptRoot 'qa\contact-sheets'
New-Item -ItemType Directory -Force -Path $out | Out-Null
foreach($book in $manifest.books){
  $slots=@($book.slots)
  $pageSize=$Columns*$Rows
  for($offset=0;$offset -lt $slots.Count;$offset+=$pageSize){
    $page=[int][Math]::Floor($offset/$pageSize)+1
    $canvas=[Drawing.Bitmap]::new($Columns*$CellWidth,$Rows*$CellHeight)
    $g=[Drawing.Graphics]::FromImage($canvas)
    $g.Clear([Drawing.Color]::FromArgb(24,23,22))
    $g.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $font=[Drawing.Font]::new('Segoe UI',10,[Drawing.FontStyle]::Bold)
    for($i=0;$i -lt $pageSize -and ($offset+$i) -lt $slots.Count;$i++){
      $slot=$slots[$offset+$i]
      $url=[string]$slot.url
      $png=$url.Substring(0,$url.Length-4)+'.png'
      $rel=if(Test-Path -LiteralPath (Join-Path $root $png)){$png}else{$url}
      $file=Join-Path $root $rel
      if(!(Test-Path -LiteralPath $file)){throw "Missing source for $($book.book) $($slot.kind) $($slot.name): $rel"}
      $col=$i%$Columns;$row=[int][Math]::Floor($i/$Columns)
      $im=[Drawing.Image]::FromFile($file)
      $scale=[Math]::Min(($CellWidth-16)/$im.Width,($CellHeight-58)/$im.Height)
      $w=[int]($im.Width*$scale);$h=[int]($im.Height*$scale)
      $x=$col*$CellWidth+[int](($CellWidth-$w)/2);$y=$row*$CellHeight+8
      $g.DrawImage($im,$x,$y,$w,$h)
      $label="{0} {1:D3} {2}" -f $slot.kind,([int]$slot.index+1),$slot.name
      if($label.Length -gt 43){$label=$label.Substring(0,40)+'...'}
      $g.DrawString($label,$font,[Drawing.Brushes]::White,$col*$CellWidth+8,($row+1)*$CellHeight-33)
      $im.Dispose()
    }
    $dest=Join-Path $out ("{0}-{1:D2}.jpg" -f $book.short,$page)
    $canvas.Save($dest,[Drawing.Imaging.ImageFormat]::Jpeg)
    $font.Dispose();$g.Dispose();$canvas.Dispose()
    Write-Output $dest
  }
}
