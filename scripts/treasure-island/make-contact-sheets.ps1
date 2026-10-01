param([int]$Columns=4,[int]$Rows=3,[int]$CellWidth=360,[int]$CellHeight=360)
Add-Type -AssemblyName System.Drawing
$repo=Resolve-Path (Join-Path $PSScriptRoot '..\..');$art=Join-Path $repo 'library\treasure-island\art\generated';$output=Join-Path $PSScriptRoot 'qa\contact-sheets';New-Item -ItemType Directory -Force -Path $output|Out-Null
function New-Sheet { param([string]$Name,[System.IO.FileInfo[]]$Files)
  $pageSize=$Columns*$Rows
  for($offset=0;$offset-lt$Files.Count;$offset+=$pageSize){$page=[int][Math]::Floor($offset/$pageSize)+1;$canvas=[Drawing.Bitmap]::new($Columns*$CellWidth,$Rows*$CellHeight);$g=[Drawing.Graphics]::FromImage($canvas);$g.Clear([Drawing.Color]::FromArgb(24,23,22));$g.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;$font=[Drawing.Font]::new('Segoe UI',12,[Drawing.FontStyle]::Bold)
    for($i=0;$i-lt$pageSize-and($offset+$i)-lt$Files.Count;$i++){$f=$Files[$offset+$i];$col=$i%$Columns;$row=[int][Math]::Floor($i/$Columns);$im=[Drawing.Image]::FromFile($f.FullName);$scale=[Math]::Min(($CellWidth-16)/$im.Width,($CellHeight-54)/$im.Height);$w=[int]($im.Width*$scale);$h=[int]($im.Height*$scale);$x=$col*$CellWidth+[int](($CellWidth-$w)/2);$y=$row*$CellHeight+8;$g.DrawImage($im,$x,$y,$w,$h);$g.DrawString($f.BaseName,$font,[Drawing.Brushes]::White,$col*$CellWidth+8,($row+1)*$CellHeight-30);$im.Dispose()}
    $path=Join-Path $output ("{0}-{1:D2}.jpg"-f$Name,$page);$canvas.Save($path,[Drawing.Imaging.ImageFormat]::Jpeg);$font.Dispose();$g.Dispose();$canvas.Dispose();Write-Output $path
  }
}
New-Sheet 'cover' @(Get-Item (Join-Path $art 'cover.png'));New-Sheet 'characters' @(Get-ChildItem (Join-Path $art 'characters') -Filter '*.png'|Sort-Object Name);New-Sheet 'items' @(Get-ChildItem (Join-Path $art 'items') -Filter '*.png'|Sort-Object Name);New-Sheet 'locations' @(Get-ChildItem (Join-Path $art 'locations') -Filter '*.png'|Sort-Object Name)
